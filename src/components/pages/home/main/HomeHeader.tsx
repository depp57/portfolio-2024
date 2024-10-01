import { Button } from '@/components/shared/button';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Menu from '@/components/shared/menu/Menu';

const variants = {
  initial: { x: 0, y: '-50%', opacity: 1 },
  hidden: { x: '20%', y: '-50%', opacity: 0 },
};

const variants2 = {
  initial: { x: '-20%', y: '-50%', opacity: 0 },
  hidden: { x: 0, y: '-50%', opacity: 1 },
};

export default function HomeHeader() {
  const t = useTranslations('home');
  const router = useRouter();
  const pathName = usePathname();

  const isOpenToWork = process.env.NEXT_PUBLIC_IS_OPEN_TO_WORK === 'true';

  const MotionButton = motion.create(Button);

  return (
    <header className="flex w-full justify-between items-center p-10">
      <MotionButton
        type="button"
        onClick={() => router.push(`${pathName}/about#contact-form`)}
        initial="initial"
        whileHover="hidden"
        size="lg"
        variant="outline"
        className={cn(
          'justify-start gap-1 min-w-56 max-h-11 lg:max-h-none text-xl items-center text-primary-text overflow-hidden',
          {
            'min-w-72': !isOpenToWork,
          },
        )}
      >
        <EnvelopeClosedIcon className="mr-2 h-6 w-6 font-extrabold" />
        <div className="relative">
          <motion.span className="-translate-y-1/2 absolute" variants={variants} transition={{ duration: 0.3 }}>
            {t(isOpenToWork ? 'openToWork' : 'closedToWork')}
          </motion.span>
          <motion.span className="absolute" variants={variants2} transition={{ duration: 0.3 }}>
            {t(isOpenToWork ? 'contactMe' : 'contactMeAnyway')}
          </motion.span>
        </div>
      </MotionButton>

      <Menu />
    </header>
  );
}
