import './globals.css';
import { Jost } from 'next/font/google';
import Sidebar from './components/sidebar/sidebar';

const jost = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'PetsPaw',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className} style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: 'auto' }}>{children}</main>
      </body>
    </html>
  );
}
