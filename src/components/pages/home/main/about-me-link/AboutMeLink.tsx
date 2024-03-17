import Link from 'next/link';
import ButtonCircle from '@/components/shared/button-circle';
import { PersonIcon } from '@radix-ui/react-icons';

export default function AboutMeLink() {
  return (
    <Link href="/about">
      <ButtonCircle className="flex items-center justify-center">
        <PersonIcon width="26" height="26" className="text-primary-text" />
      </ButtonCircle>
    </Link>
  );
}
