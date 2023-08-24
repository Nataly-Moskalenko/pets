import css from './page.module.css';

export default function HomeMain() {
  return (
    <div className={css.home}>
      <div className={css.homeInner}></div>
      <div className={css.homeImage}></div>
    </div>
  );
}
