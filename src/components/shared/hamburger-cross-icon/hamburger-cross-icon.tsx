import styles from './hamburger-cross-icon.module.css';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function HamburgerCrossIcon({ opened = true }: Readonly<{ opened: boolean }>) {
  const menu = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    if (opened) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  function openMenu() {
    menu.current.classList.add(styles.open);
  }

  function closeMenu() {
    menu.current.classList.remove(styles.open);
  }

  return (
    <span ref={menu} className={styles.menuBtn}>
      <span className={cn('bg-primary-text after:bg-primary-text before:bg-primary-text', styles.menuBtnBurger)} />
    </span>
  );
}
