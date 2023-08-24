import Image from 'next/image';
import styles from './page.module.css';

import Home from './components/home';
import Breeds from './components/breeds';
import Voting from './components/voting';
import Gallery from './components/gallery';

export default function HomeMain() {
  return (
    <main>
      <Home />
      <Voting />
      <Breeds />
      <Gallery />
    </main>
  );
}
