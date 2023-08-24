import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image src="/home.png" alt="Girl and pet" width={775} height={900} />
    </div>
  );
}
