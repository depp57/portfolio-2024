import AudioPlayer from '@/components/pages/home/main/audio-player/AudioPlayer';

export default function HomeFooter() {
  return (
    <>
      <div className="w-6 h-6 bg-green-400 dark:bg-yellow-400" />

      <div className="w-6 h-6 bg-green-400" />

      <div>
        <AudioPlayer />
      </div>
    </>
  );
}
