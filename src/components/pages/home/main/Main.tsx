import HomeHeader from '@/components/pages/home/main/HomeHeader';
import HomeFooter from '@/components/pages/home/main/HomeFooter';
import HomeBio from '@/components/pages/home/main/HomeBio';

export default function Main() {
  return (
    <>
      <header className="flex w-full justify-between items-center p-10 h-32">
        <HomeHeader />
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        <HomeBio />
      </main>

      <footer className="flex w-full justify-between items-center p-10 h-32">
        <HomeFooter />
      </footer>
    </>
  );
}
