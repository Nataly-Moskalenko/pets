'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './voting.module.css';
import Header from '../components/header/header';
import Loader from '../components/loader/loader';
import IconArrow from 'public/icons/arrow.svg';
import IconLikes from 'public/icons/likes.svg';
import IconFav from 'public/icons/favourites.svg';
import IconFavWhite from 'public/icons/favourites-white.svg';
import IconDislikes from 'public/icons/dislikes.svg';

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
    setQuery(form.elements.query.value);
  };

  return (
    <div className={css.voting}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.votingMain}>
        <div className={css.votingMainWrapper}>
          <button type="button" className={css.buttonArrow} onClick={() => router.back()}>
            <IconArrow />
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
                  <IconLikes />
                </button>
              </li>
              <li>
                <button type="button" className={css.buttonFav} onClick={onClickFav}>
                  {isFocus ? <IconFavWhite /> : <IconFav />}
                </button>
              </li>
              <li>
                <button type="button" className={css.buttonDislike} onClick={onClickDislikes}>
                  <IconDislikes />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
