'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu';
import HamburgerCrossIcon from '@/components/shared/hamburger-cross-icon/hamburger-cross-icon';
import React, { MouseEvent, useMemo, useState } from 'react';
import { ArrowTopRightIcon, GearIcon } from '@radix-ui/react-icons';
import styles from './Menu.module.css';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import LightIcon from '@static/light.svg';
import DarkIcon from '@static/dark.svg';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMusicStore } from '@/stores/musicStore';

export default function Menu() {
  const t = useTranslations('menu');

  const currentPath = usePathname().split('/').slice(1);
  const lang = currentPath[0];
  const currentPathName = currentPath[1] ?? '';
  const subRoutes = (['', 'projects', 'blog', 'about'] as const).filter((route) => route !== currentPathName);

  const { isPlaying, toggleMusic } = useMusicStore((state) => state);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isRealTimeTheme, setIsRealTimeTheme] = useState(false);
  const { theme, setTheme } = useTheme();

  function onOpenSettingsMenu(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setSettingsOpened(!settingsOpened);
  }

  function onMenuOpenChange(isOpened: boolean) {
    setMenuOpened(isOpened);

    setTimeout(() => {
      setSettingsOpened(false);
    }, 100); // prevent flickering when closing the menu
  }

  const currentTime = useMemo(() => {
    return new Date().toLocaleTimeString('en-UK', { timeZone: 'CET', hour: '2-digit', minute: '2-digit' });
  }, []);

  function toggleRealTimeTheme() {
    setIsRealTimeTheme((isRealTimeTheme) => !isRealTimeTheme);

    const currentTime = new Date().getHours();
    if (currentTime > 6 && currentTime < 20) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <DropdownMenu onOpenChange={(isOpened) => onMenuOpenChange(isOpened)}>
      <DropdownMenuTrigger asChild className="pointer-events-auto">
        <button className="rounded-full border-2 border-secondary-text hover:border-primary-text transition-[border-color] w-11 h-11">
          <HamburgerCrossIcon opened={menuOpened} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-2 border-none w-72 bg-transparent text-primary-text relative overflow-visible"
        align="end"
      >
        <div className="bg-primary rounded-lg p-3">
          {subRoutes.map((route) => (
            <DropdownMenuItem className={cn('group', styles.dropDownMenuItem)} key={route}>
              <Link href={`/${lang}/${route}`} className="flex items-center w-full">
                {t(route !== '' ? route : 'home')}
                <ArrowTopRightIcon className="ml-auto scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <span className="h-0.5" />

        <DropdownMenuItem
          onClick={(e) => onOpenSettingsMenu(e)}
          className="bg-primary rounded-lg p-3 text-4xl cursor-pointer group hover:bg-pPrimary focus:bg-pPrimary focus:text-pPrimary-text"
        >
          {t('settings')}
          <GearIcon className="ml-auto scale-150 group-hover:rotate-12" />
        </DropdownMenuItem>

        {settingsOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary rounded-lg p-3 absolute top-0 w-full flex flex-col gap-2 h-full"
          >
            <p className="text-4xl">{t('settings')}</p>

            <p className="text-xl">{t('subMenu.music')}</p>
            <div className="flex justify-between pl-3 pr-3">
              <label className="text-sm text-secondary-text">{t('subMenu.enableMusic')}</label>
              <input type="checkbox" checked={isPlaying} onChange={toggleMusic} className={styles.checkbox} />
            </div>

            <p className="text-xl">{t('subMenu.theme')}</p>
            <div className="flex justify-between pl-3 pr-3">
              <label className="text-sm text-secondary-text">
                {t('subMenu.realTime')}
                <br />
                (CET - {currentTime})
              </label>
              <input type="checkbox" className={styles.checkbox} onClick={toggleRealTimeTheme} />
            </div>

            <div className="flex justify-between pl-3 pr-3">
              <label className="text-sm text-secondary-text">{t('subMenu.displayTheme')}</label>
              <div className="flex gap-4">
                <label
                  className={cn(
                    'flex items-center justify-center rounded-full bg-gray-300 w-7 h-7 cursor-pointer',
                    styles.lightTheme,
                  )}
                >
                  <input
                    type="radio"
                    name="radio"
                    value="light-theme"
                    disabled={isRealTimeTheme}
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                  />
                  <LightIcon />
                </label>
                <label
                  className={cn(
                    'flex items-center justify-center rounded-full bg-gray-300 w-7 h-7 cursor-pointer',
                    styles.darkTheme,
                  )}
                >
                  <input
                    type="radio"
                    name="radio"
                    value="dark-theme"
                    disabled={isRealTimeTheme}
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                  />
                  <DarkIcon />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
