import { useState } from 'react';
import css from './typemenu.module.css';

export const TypeMenu = ({ setter }) => {
  const [itemsOption, setItemsOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const items = ['All', 'Static', 'Animated'];

  const handleItemsChange = (event) => {
    event.stopPropagation();
    setItemsOption(event.target.innerText);
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
        {itemsOption === '' ? 'Static' : itemsOption}
      </button>

      <div className={css.itemsMenu} onClick={(e) => e.stopPropagation()}>
        <ul className={isOpen ? css.itemsMenuOpen : css.itemsMenu}>
          {items.map((item, i) => (
            <li key={i + 1} onClick={handleItemsChange}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
