'use client';

import Image from 'next/image';
import css from './sidebar.module.css';
import Logo from '../logo/logo';
import Link from 'next/link';
import ThemeMenu from '../thememenu/thememenu';
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
        <p className={css.subtitle}>Hi!👋</p>        
        <h1 className={css.title}>Lets start using The Cat API</h1>
        <nav className={css.nav}>
          <button type="button" className={css.sidebarButton}>
            <Link href="/voting" className={'/voting' === pathname ? css.active : css.link}>
              <div className={css.vote}>
                <Image
                  src="/images/vote-table.png"
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
                  src="/images/pet-breeds.png"
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
                  src="/images/images-search.png"
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
