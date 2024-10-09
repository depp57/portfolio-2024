'use client';

import styles from './Intro.module.css';
import HomeEntry from '@/components/pages/home/intro/HomeEntry';
import ScrollHint from '@/components/pages/home/intro/ScrollHint';
import HomeLoader from '@/components/pages/home/intro/HomeLoader';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Intro() {
  const [isExperienceLoaded, setIsExperienceLoaded] = useState(false);

  return (
    <div className={styles.overlay}>
      <span className="h-32" />

      <div className="self-center">
        <AnimatePresence mode="wait">
          {isExperienceLoaded ? (
            <motion.div
              key="soundSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HomeEntry />
            </motion.div>
          ) : (
            <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <HomeLoader onLoaded={() => setIsExperienceLoaded(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-32">
        <ScrollHint />
      </div>
    </div>
  );
}
