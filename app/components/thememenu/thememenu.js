'use client';

import { useTheme } from 'next-themes';
import css from './thememenu.module.css';

import EyeOpen from 'public/icons/eye-open.svg';
import EyeClose from 'public/icons/eye-close.svg';
// import IconTurnRight from 'public/icons/turn-right.svg';
// import IconTurnLeft from 'public/icons/turn-left.svg';

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={css.themeMenu}>
      <button onClick={() => setTheme('light')} className={css.themeButton} aria-label="Light Theme">
        <EyeOpen/>
        {/* <IconTurnRight/> */}
      </button>

      <button onClick={() => setTheme('dark')} className={css.themeButton} aria-label="Dark Theme">
        <EyeClose/>
        {/* <IconTurnLeft/> */}
      </button>
    </div>
  );
}
