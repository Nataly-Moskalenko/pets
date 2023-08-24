import Home from './components/home/home';
import Breeds from './components/breeds/breeds';
import Voting from './components/voting/voting';
import Gallery from './components/gallery/gallery';

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
