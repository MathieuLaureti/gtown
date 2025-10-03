import React from 'react';
import TopMenu from './top_menu';
import Programmation from './components/programmation';
import Gallery from './components/gallery';
import Image from 'next/image';

export default function Home() {
  const people = [
    { picture: "/placeholders/64x64.svg", name: "Artist 1", description: "Performs electronic live set" },
    { picture: "/placeholders/64x64.svg", name: "Artist 2", description: "Visual art installation" },
    { picture: "/placeholders/64x64.svg", name: "Artist 3", description: "DJ set till late night" },
    { picture: "/placeholders/64x64.svg", name: "Artist 4", description: "Interactive dance performance" },
    { picture: "/placeholders/64x64.svg", name: "Artist 5", description: "Closing light show" }
  ];

  const galleryPics = Array.from({ length: 12 }, (_, i) => ({
    src: "/placeholders/64x64.svg",
    alt: `Gallery picture ${i + 1}`
  }));

  return (
    <div className="w-full mx-auto px-0 bg-blue-500 items-center justify-center">
      <TopMenu />
      <div className="flex flex-col w-full items-center justify-center min-h-screen bg-blue-500">
        <div className="flex flex-col w-5xl items-center justify-center min-h-screen bg-blue-800">

          <div className="w-full flex justify-center px-8 mt-4 mb-4">
            <div className="w-full max-w-5xl bg-blue-900 rounded-xl py-6 text-center">
              <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">
                GTOWN Emergeant
              </h1>
            </div>
          </div>

          <Image
            src="placeholders/600x400.svg"
            width={600}
            height={400}
            style={{ width: '100%', height: 'auto' }}
            alt="Your image"
            className="px-2"
          />

          {/* Programmation section */}
          <div className="w-full flex justify-center px-8 mt-4 mb-4">
            <div className="w-full max-w-5xl bg-blue-900 rounded-xl py-6 text-center">
              <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">
                PROGRAMMATION
              </h1>
            </div>
          </div>
          <Programmation people={people} />

          {/* Gallery section */}
          <div className="w-full flex justify-center px-8 mt-16 mb-8">
            <div className="w-full max-w-5xl bg-blue-900 rounded-xl py-6 text-center">
              <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">
                NOTRE DERNIER ÉVÈNEMENT
              </h1>
            </div>
          </div>
          <Gallery pictures={galleryPics} />

        </div>
      </div>
    </div>
  );
}
