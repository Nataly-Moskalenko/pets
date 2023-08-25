'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import css from './voting.module.css';
import Header from '../components/header/header';

export default function VotingLayout() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchPats() {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?query={query}`);
        const data = await response.json();
        console.log(data);
        setPets(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPats();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.elements.query.value);
    setQuery(form.elements.query.value);
    // if (form.elements.query.value === '') {
    //   toast.info('Please enter your search query.');
    //   return setSearchParams({});
    // }
    // setSearchParams({ query: form.elements.query.value });
  };

  return (
    <div className={css.voting}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.votingMain}>
        <div className={css.votingMainWrapper}>
          <button type="button" className={css.buttonArrow}>
            <Link href="/">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z"
                  fill="#FF868E"
                />
                <defs>
                  <rect width="20" height="20" fill="white" />
                </defs>
              </svg>
            </Link>
          </button>
          <h2 className={css.title}>Voting</h2>
        </div>
        {pets && (
          <Image src={pets.url} alt="cat" width={640} height={360} className={css.imagePat} />
        )}

        <svg width="256" height="88" viewBox="0 0 256 88" fill="none">
          <rect
            x="2"
            y="2"
            width="252"
            height="84"
            rx="22"
            fill="white"
            stroke="white"
            strokeWidth="4"
          />
          <rect x="88" y="4" width="80" height="80" fill="#FF868E" />
          <path
            d="M172 4H232C243.046 4 252 12.9543 252 24V64C252 75.0457 243.046 84 232 84H172V4Z"
            fill="#FFD280"
          />
          <path
            d="M197 44C197 35.7157 203.716 29 212 29C220.284 29 227 35.7157 227 44C227 52.2843 220.284 59 212 59C203.716 59 197 52.2843 197 44ZM212 31C204.82 31 199 36.8203 199 44C199 51.1797 204.82 57 212 57C219.18 57 225 51.1797 225 44C225 36.8203 219.18 31 212 31ZM207 41H205V39H207V41ZM219 41H217V39H219V41ZM204.6 49.2L205.2 48.4C208.6 43.8667 215.4 43.8667 218.8 48.4L219.4 49.2L217.8 50.4L217.2 49.6C214.6 46.1333 209.4 46.1333 206.8 49.6L206.2 50.4L204.6 49.2Z"
            fill="white"
          />
          <path
            d="M4 24C4 12.9543 12.9543 4 24 4H84V84H24C12.9543 84 4 75.0457 4 64V24Z"
            fill="#97EAB9"
          />
          <path
            d="M29 44C29 35.7157 35.7157 29 44 29C52.2843 29 59 35.7157 59 44C59 52.2843 52.2843 59 44 59C35.7157 59 29 52.2843 29 44ZM44 31C36.8203 31 31 36.8203 31 44C31 51.1797 36.8203 57 44 57C51.1797 57 57 51.1797 57 44C57 36.8203 51.1797 31 44 31ZM39 41H37V39H39V41ZM51 41H49V39H51V41ZM38.2 45.6L38.8 46.4C41.4 49.8667 46.6 49.8667 49.2 46.4L49.8 45.6L51.4 46.8L50.8 47.6C47.4 52.1333 40.6 52.1333 37.2 47.6L36.6 46.8L38.2 45.6Z"
            fill="white"
          />
          <path
            d="M121.071 33C117.718 33 115 35.7181 115 39.0711C115 40.6812 115.64 42.2254 116.778 43.364L128 54.5858L139.222 43.364C140.36 42.2254 141 40.6812 141 39.0711C141 35.7181 138.282 33 134.929 33C133.319 33 131.775 33.6396 130.636 34.7782L128.707 36.7071C128.317 37.0976 127.683 37.0976 127.293 36.7071L125.364 34.7782C124.225 33.6396 122.681 33 121.071 33ZM113 39.0711C113 34.6135 116.614 31 121.071 31C123.212 31 125.265 31.8503 126.778 33.364L128 34.5858L129.222 33.364C130.735 31.8503 132.788 31 134.929 31C139.386 31 143 34.6135 143 39.0711C143 41.2116 142.15 43.2646 140.636 44.7782L128.707 56.7071C128.317 57.0976 127.683 57.0976 127.293 56.7071L115.364 44.7782C113.85 43.2646 113 41.2116 113 39.0711Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
