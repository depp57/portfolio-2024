import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function LinkHover({ text, href }: { text: string; href: string }) {
  return (
    <Link
      className="border-b-2 border-gray-500 flex flex-wrap items-center
                after:w-full
                after:block after:content-[''] after:border-b-2 after:border-white
                after:[transform:scaleX(0)_translateY(100%)] after:transition-transform after:origin-right
                after:hover:[transform:scaleX(1)_translateY(100%)] after:hover:origin-left"
      href={href}
    >
      {text}
      <ArrowTopRightIcon className="ml-2 h-6 w-6" />
    </Link>
  );
}
