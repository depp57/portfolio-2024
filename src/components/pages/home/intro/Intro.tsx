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
        <AnimatePresence>
          {isExperienceLoaded ? (
            <motion.div
              key="soundSettings"
              initial={{ opacity: 0, position: 'absolute' }}
              animate={{ opacity: 1, position: 'unset' }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <HomeEntry />
            </motion.div>
          ) : (
            <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <HomeLoader onLoaded={() => setIsExperienceLoaded(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ position: 'relative', display: 'flex', height: '80px' }}>
        <ScrollHint />
      </div>
    </div>
  );
}
