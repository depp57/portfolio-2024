import styles from './ProgressIndicator.module.css';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProgressIndicator({
  currentProjectIndex,
  projectCount,
}: Readonly<{ currentProjectIndex: number; projectCount: number }>) {
  return (
    <div className={styles.container}>
      {Array.from({ length: projectCount }).map((_, index) => (
        <div key={index} className={styles.indicator}>
          {index === currentProjectIndex && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {index.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
            </motion.span>
          )}
          <motion.span
            initial={{ scaleX: 1 }}
            animate={{ scaleX: index === currentProjectIndex ? 1.5 : 1 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={cn(styles.line, index === currentProjectIndex && styles.active)}
          />
        </div>
      ))}
    </div>
  );
}
