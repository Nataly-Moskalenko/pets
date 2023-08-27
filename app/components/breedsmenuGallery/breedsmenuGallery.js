import { useEffect, useState } from 'react';
import css from './breedsmenuGallery.module.css';

export const BreedsMenuGallery = ({ setter, menuText }) => {
  const [breedsOption, setBreedsOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function getBreeds() {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.log(error);
      }
    }

    getBreeds();
  }, []);

  const handleBreedsChange = (event) => {
    event.stopPropagation();
    setBreedsOption(event.target.innerText);
    setter(event.target.innerText);
    setIsOpen(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.menuWrapper}>
      <button className={css.menuButton} onClick={handleClick}>
        {breedsOption === '' ? menuText : breedsOption}
      </button>

      <div className={css.breedsMenu} onClick={(e) => e.stopPropagation()}>
        <ul className={isOpen ? css.breedsMenuOpen : css.breedsMenu}>
          {breeds.map((item) => (
            <li key={item.id} onClick={handleBreedsChange}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
