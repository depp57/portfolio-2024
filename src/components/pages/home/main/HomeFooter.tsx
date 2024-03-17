import AudioPlayer from '@/components/pages/home/main/audio-player/AudioPlayer';
import GithubLink from '@/components/pages/home/main/github-link/GithubLink';

export default function HomeFooter() {
  return (
    <>
      <div>
        <GithubLink />
      </div>

      <div className="w-6 h-6 bg-green-400" />

      <div>
        <AudioPlayer />
      </div>
    </>
  );
}
