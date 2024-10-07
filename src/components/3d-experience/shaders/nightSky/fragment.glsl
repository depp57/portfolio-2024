#define MOONPOS vec2(0.6, .75)
#define PI 3.14159265

varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uFxTexture;
uniform float uGlowBrightness; // { "value": 0.9, "min": 0, "max": 2 }
uniform float uTime;
uniform float uAuroraIteration; // { "value": 15, "min": 0, "max": 30 }


float circ(vec2 uv, vec2 pos, float radius, float blur) {
    float dist = length(uv-pos);
    return smoothstep (radius+blur, radius-blur, dist);
}

const float MOON_RADIUS = 0.01;
const float MOON_GLOW_RADIUS_MULTIPLIER = 10.0; // You can adjust this value to control the glow spread

vec4 moon(vec2 uv) {
    // Calculate the moon-specific UVs
    vec2 moonUV = (uv - MOONPOS * 0.5) * 2.35; // The multiplier can be adjusted for the moon's size on the texture

    // Only sample the texture if we're inside the moon circle
    float c = circ(uv, MOONPOS, MOON_RADIUS, .002);
    if (c > 0.0) {
        vec4 textureColor = texture2D(uTexture, moonUV);
        vec4 col = textureColor;
        col.rgb *= .8;
        col *= c;  // Multiply by the mask to only show the moon where it's supposed to be
        return col;
    }

    return vec4(0.0);
}


vec4 moonglow(vec2 uv, float foreground) {
    float dist = length(uv - MOONPOS); // Distance from the current pixel to the moon's center
    float glowRadius = MOON_RADIUS * MOON_GLOW_RADIUS_MULTIPLIER;

    // Compute the close and harsh glow
    float closeGlow = 0.6 * exp(-8.0 * dist / glowRadius);

    // Compute the broader glow
    float broadGlowRadius = MOON_RADIUS * 2.0 * MOON_GLOW_RADIUS_MULTIPLIER; // Twice the original glow radius
    float broadGlow = 0.05 * exp(-2.0 * dist / broadGlowRadius); // Slow falloff

    float totalGlow = (closeGlow + broadGlow) * uGlowBrightness; // Combine the two glows and adjust the brightness

    vec4 col = vec4(vec3(totalGlow), 0.05);

    return col;
}



// Auroras by nimitz 2017 (twitter: @stormoid)
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// https://www.shadertoy.com/view/XtGGRt

//AURORA STUFF
mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}
mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);
float tri(in float x){return clamp(abs(fract(x)-.5),0.01,0.49);}
vec2 tri2(in vec2 p){return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));}

float triNoise2d(in vec2 p, float spd)
{
    float z=1.8;
    float z2=2.5;
    float rz = 0.;
    p *= mm2(p.x*0.06);
    vec2 bp = p;
    for (float i=0.; i<4.; i++ )
    {
        vec2 dg = tri2(bp*1.85)*.75;
        dg *= mm2(uTime*spd);
        p -= dg/z2;

        bp *= 1.3;
        z2 *= .45;
        z *= .42;
        p *= 1.21 + (rz-1.0)*.02;

        rz += tri(p.x+tri(p.y))*z;
        p*= -m2;
    }
    return clamp(1./pow(rz*29., 1.3),0.,.55);
}

float hash21(in vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
vec4 aurora(vec3 ro, vec3 rd)
{
    vec4 col = vec4(0);
    vec4 avgCol = vec4(0);

    for(float i=0.;i<uAuroraIteration;i++)
    {
        float of = 0.006*hash21(gl_FragCoord.xy)*smoothstep(0.,15., i);
        float pt = ((.8+pow(i,1.4)*.002)-ro.y)/(rd.y*2.+0.4);
        pt -= of;
        vec3 bpos = ro + pt*rd;
        vec2 p = bpos.zx;
        float rzt = triNoise2d(p, 0.06);
        vec4 col2 = vec4(0,0,0, rzt);
        col2.rgb = (sin(1.-vec3(2.15,-.5, 1.2)+i*0.043)*0.5+0.5)*rzt;
        avgCol =  mix(avgCol, col2, .5);
        col += avgCol*exp2(-i*0.065 - 2.5)*smoothstep(0.,5., i);

    }

    col *= (clamp(rd.y*15.+.4,0.,1.));

    return col*1.8;
}

//END AURORA STUFF

vec3 bg(in vec3 rd)
{
    float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd)*0.5+0.5;
    sd = pow(sd, 5.);
    vec3 col = mix(vec3(0.05,0.1,0.2), vec3(0.1,0.05,0.2), sd);
    return col*.63;
}



float hash1(vec2 p){
    vec2 v = vec2(PI*1453.0,exp(1.)*3054.0);
    return fract(sin(dot(p,v)*0.1)*4323.0);
}

vec3 getColor(float c){
    float r = cos((c-0.75)*PI);
    float g = cos((c-0.55)*PI);
    float b = cos((c-0.25)*PI);
    return vec3(r,g,b);
}




float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}


void drawMeteor(inout vec3 col, in vec2 uv, vec2 startP, vec2 endP, float linWidth) {
    uv *= 3.0;
    vec2 lineDir = endP - startP;
    vec2 fragDir = uv - startP;

    // keep the line coefficient bewteen [0,1] so that the projective dir on the
    // lineDir will not exceed or we couldn't get a line segment but a line.
    float lineCoe = clamp(dot(lineDir, fragDir) / dot(lineDir, lineDir), 0., 1.0);
    vec2 projDir = lineCoe * lineDir;

    vec2 fragToLineDir = fragDir - projDir;
    float dis = length(fragToLineDir);
    float disToTail = length(projDir);
    dis = linWidth / dis;

    col += dis * vec3(0.3) * pow(disToTail, 3.0); // Assuming meteor color to be vec3(0.3)
}

void drawMeteors(inout vec3 col, vec2 uv) {
    uv = (uv - vec2(0.5)) * 10.0 + vec2(0.5);

    vec2 dir = normalize(vec2(-1.0, -0.5));
    vec2 mv = -dir * cos(mod(uTime * 0.35, PI)) * 60.0;

    int numberOfMeteors = 3;
    for(int i = 0; i < numberOfMeteors; i++) {
        vec2 randomOffset = vec2(hash(float(i) + 1.0), hash(float(i) + 2.0) * 1.0 + 1.0) * 5.0; // Some randomness
        vec2 sp = vec2(10.0 + 100.0 * hash1(vec2(floor(uTime * 0.35 / PI) + float(i))), 10.0) + randomOffset;
        vec2 ep = sp + dir * 2.0;

        drawMeteor(col, uv, sp + mv, ep + mv, 0.0008);
    }
}


vec3 nmzHash33(vec3 q)
{
    uvec3 p = uvec3(ivec3(q));
    p = p * uvec3(374761393U, 1103515245U, 668265263U) + p.zxy + p.yzx;
    p = p.yzx * (p.zxy ^ (p >> 3U));
    return vec3(p ^ (p >> 16U)) * (1.0 / vec3(0xffffffffU));
}

vec3 starsSky(in vec3 p, float time)
{
    vec3 c = vec3(0.);
    float res = 8000.*1.;

    for (float i = 0.; i < 3.; i++)
    {
        vec3 q = fract(p * (.15 * res)) - 0.5;
        vec3 id = floor(p * (.15 * res));
        vec2 rn = nmzHash33(id).xy;

        // Improved twinkle effect using position-based phase shift
        float phase = dot(id, vec3(12.9898, 78.233, 151.7182)); // Use id to generate a unique phase for each star
        float twinkle = sin(time + phase);
        twinkle = (twinkle + 1.0) * 0.5; // Normalize twinkle to 0.0 - 1.0

        float c2 = 1. - smoothstep(0., .6, length(q));
        c2 *= step(rn.x, .0005 + i * i * 0.001);
        c2 *= twinkle; // Apply the twinkle effect

        c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.), rn.y) * 0.1 + 0.9);
        p *= 1.3;
    }
    return c * c * .8;
}



void main() {
    // Initialize the output color to black
    vec3 color = vec3(0.);


    //Moon
    vec4 moonColor = moon(vUv); // Calculate the color based on the moon function
    vec4 moonGlowColor = moonglow(vUv, 1.0); // Calculate the color based on the moonglow function




    //Aurora
    float shiftAmount = -0.2;  // Adjust this value to control the shift
    //Center of the uv
    vec2 p = vec2(vUv.x, vUv.y - shiftAmount) - 0.5;
    vec3 ro = vec3(0,0,-6.7);
    vec3 rd = normalize(vec3(p,1.3));
    float fade = smoothstep(0.,0.01,abs(rd.y))*0.1+0.9;
    // Calculate background color based on ray direction and apply the fade factor


    color = bg(rd)*fade*0.2;

    //Adding Stars
    color += starsSky(rd, uTime * 2.);

    if (uAuroraIteration > 0.0) {
        vec4 aur = vec4(0.);

        float loopSecond = 40.0;
        float opacityCap = 0.2;
        float oscillationFactor = 0.5 * (sin(uTime * (2.0 * 3.14159 / loopSecond)) + 1.0) * opacityCap;

        aur = smoothstep(0.,1.5,aurora(ro,rd))*fade*oscillationFactor;
        color = color*(1.-aur.a) + aur.rgb ;
    }


    //Commet
    drawMeteors(color, vUv); // add this line to draw the meteors


    vec4 finalColor = vec4(color, 1.0); // Add all the colors together

    finalColor += moonGlowColor;
    finalColor += moonColor;



    // Fx
    float fxColor = texture2D(uFxTexture, vUv).r;
    vec4 colorBright = finalColor * vec4(1.3);
    finalColor = mix(finalColor, colorBright, fxColor);


    gl_FragColor = finalColor; // Set the output color of the pixel


    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}