'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './breeds.module.css';
import Header from '../components/header/header';
import Loader from '../components/loader/loader';
import { BreedsMenu } from '../components/breedsmenu/breedsmenu';
import { ItemsMenu } from '../components/itemsmenu/itemsmenu';
import IconArrow from 'public/icons/arrow.svg';

export default function Breeds() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [limit, setLimit] = useState('10');
  const [breedActive, setBreedActive] = useState('');
  const [loading, setLoading] = useState(false);
  const items = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];

  useEffect(() => {
    async function fetchBreeds() {
      setLoading(true);
      setPets(null);
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=` +
            limit +
            '&breeds_id=' +
            breedActive.id +
            '&name=' +
            query +
            `&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBreeds();
  }, [limit, breedActive, query]);

  const breedsMenuData = (data) => {
    setBreedActive(data[0]);
  };

  const itemsMenuData = (data) => {
    setLimit(data.split(' ')[1]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setQuery(form.elements.query.value);
  };

  return (
    <div className={css.breeds}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.breedsMain}>
        <div className={css.breedsMainWrapper}>
          <button type="button" className={css.buttonArrow} onClick={() => router.back()}>
            <IconArrow/>
          </button>
          <h2 className={css.title}>Breeds</h2>
          <BreedsMenu setter={breedsMenuData} menuText="All breeds" />
          <ItemsMenu setter={itemsMenuData} items={items} itemText="Limit: 10" />
        </div>

        {loading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}

        <div className={css.parent}>
          {!loading &&
            pets &&
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
