'use client';

import Image from 'next/image';
import css from './sidebar.module.css';
import Logo from '../logo/logo';
import Link from 'next/link';
import { ThemeMenu } from '../thememenu/thememenu';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className={css.sidebar}>
      <div className={css.sidebarHeader}>
        <Logo />
        <ThemeMenu />
      </div>
      <div className={css.sidebarWrapper}>
        <h1 className={css.title}>Hi!👋</h1>
        <p className={css.text}>Welcome to MacPaw Bootcamp 2023</p>
        <h2 className={css.subtitle}>Lets start using The Cat API</h2>
        <nav className={css.nav}>
          <button type="button" className={css.sidebarButton}>
            <Link href="/voting" className={'/voting' === pathname ? css.active : css.link}>
              <div className={css.vote}>
                <Image
                  src="/vote-table.png"
                  alt="Vote table"
                  width={100}
                  height={124}
                  className={css.voteImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Voting</p>
              </div>
            </Link>
          </button>
          <button type="button" className={css.sidebarButton}>
            <Link href="/breeds" className={'/breeds' === pathname ? css.active : css.link}>
              <div className={css.breeds}>
                <Image
                  src="/pet-breeds.png"
                  alt="Pet breeds"
                  width={117}
                  height={163}
                  className={css.breedsImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Breeds</p>
              </div>
            </Link>
          </button>
          <button type="button" className={css.sidebarButton}>
            <Link href="/gallery" className={'/gallery' === pathname ? css.active : css.link}>
              <div className={css.gallery}>
                <Image
                  src="/images-search.png"
                  alt="Images search"
                  width={112}
                  height={190}
                  className={css.galleryImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Gallery</p>
              </div>
            </Link>
          </button>
        </nav>
      </div>
    </div>
  );
}
