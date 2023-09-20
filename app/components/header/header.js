'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import css from './header.module.css';

import IconSearch from 'public/icons/search.svg';
import IconLikes from 'public/icons/likes.svg';
import IconFav from 'public/icons/favourites.svg';
import IconDislikes from 'public/icons/dislikes.svg';

export default function Header({ handleSubmit }) {
  const [input, setInput] = useState('');
  const pathname = usePathname();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={css.votingWrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Search for breeds by name"
          value={input}
          onChange={handleChange}
          className={css.input}
        />
        <button type="submit" className={css.buttonInput}>
          <IconSearch />
        </button>
      </form>
      <div className={css.links}>
        <Link href="/likes" className={'/likes' === pathname ? css.active : css.link}>
          <div className={css.svgLink}>
            <IconLikes />
          </div>
        </Link>
        <Link href="/favourites" className={'/favourites' === pathname ? css.active : css.link}>
          <div className={css.svgLink}>
            <IconFav />
          </div>
        </Link>
        <Link href="/dislikes" className={'/dislikes' === pathname ? css.active : css.link}>
          <div className={css.svgLink}>
            <IconDislikes />
          </div>
        </Link>
      </div>
    </div>
  );
}
