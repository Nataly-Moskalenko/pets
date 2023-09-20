import css from './logo.module.css';

import LogoIcon from 'public/icons/logo-icon.svg';
import LogoText from 'public/icons/logo-text.svg';

export default function Logo() {
  return (
    <header className={css.logo}>
      <LogoIcon />
      <LogoText />
    </header>
  );
}
