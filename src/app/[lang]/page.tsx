import AudioPlayer from "@/components/audio-player/AudioPlayer";
import SoundSettings from "@/components/SoundSettings";
import ScrollHint from "@/components/ScrollHint";

export default async function Home() {
  return (
    <>
      <div className="self-end p-10">
        <AudioPlayer />
      </div>

      <div className="w-1/6 self-center">
        <SoundSettings />
      </div>

      <div style={{ position: "relative", display: "flex", height: "80px" }}>
        <ScrollHint />
      </div>
    </>
  );
}
