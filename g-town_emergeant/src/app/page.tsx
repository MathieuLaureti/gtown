import React from 'react';
import TopMenu from './top_menu';
import Image from 'next/image';
export default function Home() {
  return (
  <div className="w-full max-w-[700px] mx-auto px-0 bg-blue-500">
    <TopMenu />
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <p>test</p>
      <Image
        src="placeholders/600x800.svg"
        width={600}
        height={800}
        style={{ width: '100%', height: 'auto' }} // Or use Tailwind/CSS
        alt="Your image"
        className="p-2"
      />
      <p>test</p>
      
    </div>
  </div>
  );
}
