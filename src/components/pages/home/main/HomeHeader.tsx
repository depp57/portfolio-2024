import { Button } from '@/components/shared/button';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import HomeMenu from '@/components/pages/home/main/home-menu/HomeMenu';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

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

  const MotionButton = motion(Button);

  return (
    <>
      <MotionButton
        initial="initial"
        whileHover="hidden"
        size="lg"
        variant="outline"
        className={'justify-start gap-1 min-w-56 text-xl items-center text-primary-text overflow-hidden'}
      >
        <EnvelopeClosedIcon className="mr-2 h-6 w-6 font-extrabold" />
        <div className="relative">
          <motion.span className="-translate-y-1/2 absolute" variants={variants} transition={{ duration: 0.3 }}>
            {t('openToWork')}
          </motion.span>
          <motion.span className="absolute" variants={variants2} transition={{ duration: 0.3 }}>
            {t('contactMe')}
          </motion.span>
        </div>
      </MotionButton>
      <HomeMenu />
    </>
  );
}
