import styles from './ProgressIndicator.module.css';
import { cn } from '@/lib/utils';

export default function ProgressIndicator({
  currentProjectIndex,
  projectCount,
}: Readonly<{ currentProjectIndex: number; projectCount: number }>) {
  return (
    <div className={styles.container}>
      {Array.from({ length: projectCount }).map((_, index) => (
        <div key={index} className={styles.indicator}>
          {index === currentProjectIndex && (
            <>{index.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</>
          )}
          <span className={cn(styles.line, index === currentProjectIndex && styles.active)} />
        </div>
      ))}
    </div>
  );
}
