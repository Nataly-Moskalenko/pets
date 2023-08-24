import Image from 'next/image';
import css from './sidebar.module.css';
import Logo from '../logo/logo';

export default function Sidebar() {
  return (
    <div className={css.sidebar}>
      <Logo />
      <div className={css.sidebarWrapper}>
        <h1 className={css.title}>Hi!👋</h1>
        <p className={css.text}>Welcome to MacPaw Bootcamp 2023</p>
        <h2 className={css.subtitle}>Lets start using The Cat API</h2>
        <nav className={css.nav}>
          <button type="button" className={css.sidebarButton}>
            <a href="#Voting">
              <div className={css.vote}>
                <Image
                  src="/vote-table.png"
                  alt="Girl and pet"
                  width={100}
                  height={124}
                  className={css.voteImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Voting</p>
              </div>
            </a>
          </button>
          <button type="button" className={css.sidebarButton}>
            <a href="#Breeds">
              <div className={css.breeds}>
                <Image
                  src="/pet-breeds.png"
                  alt="Girl and pet"
                  width={117}
                  height={163}
                  className={css.breedsImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Breeds</p>
              </div>
            </a>
          </button>
          <button type="button" className={css.sidebarButton}>
            <a href="#Gallery">
              <div className={css.gallery}>
                <Image
                  src="/images-search.png"
                  alt="Girl and pet"
                  width={112}
                  height={190}
                  className={css.galleryImage}
                />
              </div>
              <div className={css.textWrapper}>
                <p className={css.buttonText}>Gallery</p>
              </div>
            </a>
          </button>
        </nav>
      </div>
    </div>
  );
}
