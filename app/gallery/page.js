'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './gallery.module.css';
import Header from '../components/header/header';

export default function Gallery() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPats() {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10`);
        const data = await response.json();
        console.log(data);
        setPets(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPats();
  }, []);

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
    <div className={css.breeds}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.breedsMain}>
        <div className={css.breedsMainWrapper}>
          <button type="button" className={css.buttonArrow} onClick={() => router.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z"
                fill="#FF868E"
              />
              <defs>
                <rect width="20" height="20" fill="white" />
              </defs>
            </svg>
          </button>
          <h2 className={css.title}>Gallery</h2>
        </div>
        <div className={css.parent}>
          {pets &&
            pets.map((pet, i) => (
              <div key={i + 1} className={css['div' + (i + 1)]}>
                <Image src={pet.url} alt="cat" width={420} height={300} className={css.image} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
