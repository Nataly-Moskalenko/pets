import Sidebar from './components/sidebar/sidebar';

import css from './page.module.css';

export default function HomeMain() {
  return (
    <>
      <Sidebar/>
      <div className={css.home}>
        <div className={css.homeInner}></div>
        <div className={css.homeImage}></div>
      </div>
    </>
  );
}
