import AudioPlayer from '@/components/pages/home/main/audio-player/AudioPlayer';
import GithubLink from '@/components/pages/home/main/github-link/GithubLink';
import AboutMeLink from '@/components/pages/home/main/about-me-link/AboutMeLink';

export default function HomeFooter() {
  return (
    <>
      <div>
        <GithubLink />
      </div>

      <div>
        <AboutMeLink />
      </div>

      <div>
        <AudioPlayer />
      </div>
    </>
  );
}
