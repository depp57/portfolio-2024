'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu';
import HamburgerCrossIcon from '@/components/shared/hamburger-cross-icon/hamburger-cross-icon';
import React, { MouseEvent, useState } from 'react';
import { ArrowTopRightIcon, GearIcon } from '@radix-ui/react-icons';
import styles from './Menu.module.css';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import LightIcon from '@static/icons/light.svg';
import DarkIcon from '@static/icons/dark.svg';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useMusicStore } from '@/stores/musicStore';
import { Link } from '@/lib/i18n/routing';

export default function Menu() {
  const t = useTranslations('menu');

  const lastPathSegment = usePathname().split('/').slice(1)[1] ?? '';
  const availableRoutes = (['', 'projects', 'blog', 'about'] as const).filter((route) => route !== lastPathSegment);

  const { isPlaying, toggleMusic } = useMusicStore((state) => state);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();

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

  function switchLanguage() {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    window.location.href = `/${newLocale}`;
  }

  return (
    <DropdownMenu modal={false} onOpenChange={(isOpened) => onMenuOpenChange(isOpened)}>
      <DropdownMenuTrigger asChild className="pointer-events-auto">
        <button className="rounded-full border-2 border-secondary-text hover:border-primary-text transition-[border-color] w-11 h-11">
          <HamburgerCrossIcon opened={menuOpened} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-3 border-none w-72 bg-transparent text-primary-text relative overflow-visible"
        align="end"
      >
        <div className="bg-primary rounded-lg p-3">
          {availableRoutes.map((route) => (
            <DropdownMenuItem className={cn('group', styles.dropDownMenuItem)} key={route}>
              <Link href={`/${route}`} className="flex items-center w-full" scroll={false}>
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

            <p className="text-xl">{t('subMenu.language')}</p>
            <div className="flex justify-between pl-3 pr-3">
              <label className="text-sm text-secondary-text">{t('subMenu.languageList')}</label>
              <input type="checkbox" checked={locale === 'en'} onChange={switchLanguage} className={styles.checkbox} />
            </div>

            <p className="text-xl">{t('subMenu.music')}</p>
            <div className="flex justify-between pl-3 pr-3">
              <label className="text-sm text-secondary-text">{t('subMenu.enableMusic')}</label>
              <input type="checkbox" checked={isPlaying} onChange={toggleMusic} className={styles.checkbox} />
            </div>

            <p className="text-xl">{t('subMenu.theme')}</p>
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
