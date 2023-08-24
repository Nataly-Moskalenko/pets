import Link from 'next/link';

export default function VotingLayout({ children }) {
  return (
    <div>
      <h1>Voting</h1>
      <Link href="/voting/likes">Likes</Link>
      <Link href="/voting/dislikes">Dislikes</Link>
      <Link href="/voting/favourites">Favourites</Link>
      {children}
    </div>
  );
}
