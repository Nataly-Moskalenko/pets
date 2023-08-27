'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './gallery.module.css';
import Header from '../components/header/header';
import Loader from '../components/loader/loader';
import { BreedsMenuGallery } from '../components/breedsmenuGallery/breedsmenuGallery';
import { OrderMenu } from '../components/ordermenu/ordermenu';
import { TypeMenu } from '../components/typemenu/typemenu';
import { ItemsMenuGallery } from '../components/itemsmenuGallery/itemsmenuGallery';

export default function Gallery() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [limit, setLimit] = useState('5');
  const [breedActive, setBreedActive] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('jpg,png');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('2');
  const items = ['5 items per page', '10 items per page', '15 items per page', '20 items per page'];

  useEffect(() => {
    async function fetchBreeds() {
      setLoading(true);
      setPets(null);
      try {
        const response = await fetch(
          'https://api.thecatapi.com/v1/images/search?limit=' +
            limit +
            '&breeds_id=' +
            breedActive.id +
            '&name=' +
            query +
            '&order=' +
            order +
            '&mime_types=' +
            type +
            '&page=1&api_key=live_tLhrECeCPhKCsKbbSHZ7fTRTr2YzUzxP69fjnFX0m5dFO5zQPjwVttHMrEu147tV'
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
  }, [limit, breedActive, order, query, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setQuery(form.elements.query.value);
  };

  const breedsMenuData = (data) => {
    setBreedActive(data[0]);
  };

  const itemsMenuData = (data) => {
    setLimit(data.split(' ')[0]);
  };

  const orderMenuData = (data) => {
    setOrder(data.toUpperCase());
  };

  const typeMenuData = (data) => {
    if (data === 'All') {
      setType('jpg,gif,png');
    } else if (data === 'Static') {
      setType('jpg,png');
    } else if (data === 'Animated') {
      setType('gif');
    }
  };

  async function fetchNewPats() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=' +
          limit +
          '&breeds_id=' +
          breedActive.id +
          '&name=' +
          query +
          '&order=' +
          order +
          '&mime_types=' +
          type +
          '&page=' +
          page +
          '&api_key=live_tLhrECeCPhKCsKbbSHZ7fTRTr2YzUzxP69fjnFX0m5dFO5zQPjwVttHMrEu147tV'
      );
      const data = await response.json();
      setPets([...pets].concat(...data));
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.breeds}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.breedsMain}>
        <div className={css.breedsMainWrapper}>
          <button type="button" className={css.buttonArrow} onClick={() => router.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z" />
            </svg>
          </button>
          <h2 className={css.title}>Gallery</h2>
        </div>
        <div className={css.allMenuWrapper}>
          <div>
            <p className={css.text}>Order</p>
            <OrderMenu setter={orderMenuData} />
          </div>
          <div>
            <p className={css.text}>Type</p>
            <TypeMenu setter={typeMenuData} />
          </div>
          <div>
            <p className={css.text}>Breed</p>
            <BreedsMenuGallery setter={breedsMenuData} menuText="None" />
          </div>
          <div>
            <p className={css.text}>Limit</p>
            <ItemsMenuGallery setter={itemsMenuData} items={items} itemText="5 items per page" />
          </div>
          <button type="button" onClick={fetchNewPats} className={css.actionButton}>
            <svg width="18" height="20" viewBox="0 0 18 20">
              <path d="M8.48189 2.49989L6.93396 0.953004L7.88633 0L11.0577 3.16928L7.88634 6.33873L6.93395 5.38576L8.47232 3.84832C4.51244 3.99813 1.3473 7.25498 1.3473 11.2478C1.3473 15.3361 4.66547 18.6527 8.75744 18.6527C12.8494 18.6527 16.1676 15.3361 16.1676 11.2478V10.5742H17.5149V11.2478C17.5149 16.081 13.5927 20 8.75744 20C3.92221 20 0 16.081 0 11.2478C0 6.50682 3.77407 2.64542 8.48189 2.49989Z" />
            </svg>
          </button>
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
