import Link from 'next/link';
import ButtonCircle from '@/components/shared/button-circle';
import { PersonIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';

export default function AboutMeLink() {
  const lang = useParams().lang;

  return (
    <Link href={`/${lang}/about`}>
      <ButtonCircle className="flex items-center justify-center">
        <PersonIcon width="26" height="26" className="text-primary-text" />
      </ButtonCircle>
    </Link>
  );
}
