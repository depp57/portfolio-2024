import styles from './hamburger-cross-icon.module.css';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function HamburgerCrossIcon({ opened = true }: Readonly<{ opened: boolean }>) {
  const menu = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    menu.current.classList.toggle(styles.open, opened);
  }, [opened]);

  return (
    <span ref={menu} className={styles.menuBtn}>
      <span className={cn('bg-primary-text after:bg-primary-text before:bg-primary-text', styles.menuBtnBurger)} />
    </span>
  );
}
