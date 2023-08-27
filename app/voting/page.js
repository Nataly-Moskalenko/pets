'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './voting.module.css';
import Header from '../components/header/header';
import Loader from '../components/loader/loader';

export default function VotingLayout() {
  const [pets, setPets] = useState(null);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('likes')) {
      setLikes(JSON.parse(localStorage.getItem('likes')));
    } else {
      setLikes([]);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('dislikes')) {
      setDislikes(JSON.parse(localStorage.getItem('dislikes')));
    } else {
      setDislikes([]);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('fav')) {
      setFav(JSON.parse(localStorage.getItem('fav')));
    } else {
      setFav([]);
    }
  }, []);

  const onClickLikes = () => {
    if (!likes.find((card) => card.id === pets.id)) {
      likes.push(pets);
      localStorage.setItem('likes', JSON.stringify(likes));
    }
    setIsFocus(false);
  };

  const onClickDislikes = () => {
    if (!dislikes.find((card) => card.id === pets.id)) {
      dislikes.push(pets);
      localStorage.setItem('dislikes', JSON.stringify(dislikes));
    }
    setIsFocus(false);
  };

  const onClickFav = () => {
    if (!fav.find((card) => card.id === pets.id)) {
      fav.push(pets);
      localStorage.setItem('fav', JSON.stringify(fav));
    }
    setIsFocus(true);
  };

  useEffect(() => {
    async function fetchPats() {
      setLoading(true);
      setPets(null);
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?query={query}`);
        const data = await response.json();
        console.log(data);
        setPets(data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPats();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.elements.query.value);
    setQuery(form.elements.query.value);
  };

  return (
    <div className={css.voting}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.votingMain}>
        <div className={css.votingMainWrapper}>
          <button type="button" className={css.buttonArrow} onClick={() => router.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z" />
            </svg>
          </button>
          <h2 className={css.title}>Voting</h2>
        </div>

        {loading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}

        {!loading && pets && (
          <Image src={pets.url} alt="cat" width={640} height={360} className={css.imagePat} />
        )}
        {!loading && (
          <div className={css.buttonsWrapper}>
            <ul className={css.votingButtons}>
              <li>
                <button type="button" className={css.buttonLike} onClick={onClickLikes}>
                  <svg width="30" height="30" viewBox="0 0 30 30">
                    <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM9.2 16.6L9.8 17.4C12.4 20.8667 17.6 20.8667 20.2 17.4L20.8 16.6L22.4 17.8L21.8 18.6C18.4 23.1333 11.6 23.1333 8.2 18.6L7.6 17.8L9.2 16.6Z" />
                  </svg>
                </button>
              </li>
              <li>
                <button type="button" className={css.buttonFav} onClick={onClickFav}>
                  {isFocus ? (
                    <svg width="30" height="26" viewBox="0 0 30 26">
                      <path d="M8.07107 0C3.61354 0 0 3.61354 0 8.07107C0 10.2116 0.850339 12.2646 2.36396 13.7782L14.2929 25.7071C14.6834 26.0976 15.3166 26.0976 15.7071 25.7071L27.636 13.7782C29.1497 12.2646 30 10.2116 30 8.07107C30 3.61354 26.3865 0 21.9289 0C19.7884 0 17.7354 0.850341 16.2218 2.36396L15 3.58579L13.7782 2.36396C12.2646 0.850343 10.2116 0 8.07107 0Z" />
                    </svg>
                  ) : (
                    <svg width="30" height="26" viewBox="0 0 30 26">
                      <path d="M8.07107 2C4.71811 2 2 4.71811 2 8.07107C2 9.68122 2.63963 11.2254 3.77817 12.364L15 23.5858L26.2218 12.364C27.3604 11.2254 28 9.68121 28 8.07107C28 4.71811 25.2819 2 21.9289 2C20.3188 2 18.7746 2.63963 17.636 3.77817L15.7071 5.70711C15.3166 6.09763 14.6834 6.09763 14.2929 5.70711L12.364 3.77818C11.2254 2.63963 9.68121 2 8.07107 2ZM0 8.07107C0 3.61354 3.61354 0 8.07107 0C10.2116 0 12.2646 0.850343 13.7782 2.36396L15 3.58579L16.2218 2.36396C17.7354 0.850341 19.7884 0 21.9289 0C26.3865 0 30 3.61354 30 8.07107C30 10.2116 29.1497 12.2646 27.636 13.7782L15.7071 25.7071C15.3166 26.0976 14.6834 26.0976 14.2929 25.7071L2.36396 13.7782C0.850339 12.2646 0 10.2116 0 8.07107Z" />
                    </svg>
                  )}
                </button>
              </li>
              <li>
                <button type="button" className={css.buttonDislike} onClick={onClickDislikes}>
                  <svg width="30" height="30" viewBox="0 0 30 30">
                    <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM7.6 20.2L8.2 19.4C11.6 14.8667 18.4 14.8667 21.8 19.4L22.4 20.2L20.8 21.4L20.2 20.6C17.6 17.1333 12.4 17.1333 9.8 20.6L9.2 21.4L7.6 20.2Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
