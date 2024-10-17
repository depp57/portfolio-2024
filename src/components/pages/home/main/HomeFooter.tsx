import AudioPlayer from '@/components/pages/home/main/audio-player/AudioPlayer';
import GithubLink from '@/components/pages/home/main/github-link/GithubLink';
import AboutMeLink from '@/components/pages/home/main/about-me-link/AboutMeLink';

export default function HomeFooter() {
  return (
    <footer className="fixed bottom-0 flex w-full justify-between items-center p-10 h-32">
      <div>
        <GithubLink />
      </div>

      <div>
        <AboutMeLink />
      </div>

      <div>
        <AudioPlayer />
      </div>
    </footer>
  );
}
