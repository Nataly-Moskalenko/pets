import { ImSpinner } from 'react-icons/im';
import css from './loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <ImSpinner className={css.loaderIcon} />      
    </div>
  );
}