import { useEffect, useState } from 'react';
import css from './breedsmenu.module.css';

export const BreedsMenu = ({ setter, menuText }) => {
  const [breedsOption, setBreedsOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [breedActive, setBreedActive] = useState(null);

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
    setBreedActive(breeds.filter((item) => item.name === event.target.innerText));
    setter(breeds.filter((item) => item.name === event.target.innerText));
    setIsOpen(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.menuWrapper}>
      <button className={css.menuButton} onClick={handleClick} type="button">
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
