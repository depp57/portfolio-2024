import { Link } from '@/lib/i18n/routing';
import Menu from '@/components/shared/menu/Menu';

export default function Blog() {
  return (
    <header className="fixed flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32">
      <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
        Sacha
      </Link>

      <Menu />
    </header>
  );
}
