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
import IconArrow from 'public/icons/arrow.svg';
import Icon from '/public/icons/gallery-button.svg';

export default function Gallery() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [limit, setLimit] = useState('5');
  const [breedActive, setBreedActive] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('jpg,png');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('1');
  const items = ['5 items per page', '10 items per page', '15 items per page', '20 items per page'];

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
            '&order=' +
            order +
            '&mime_types=' +
            type +
            `&page=0&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
        `https://api.thecatapi.com/v1/images/search?limit=` +
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
          `&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
            <IconArrow />
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
            <Icon />
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
