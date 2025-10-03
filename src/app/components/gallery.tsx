import React from "react";
import Image from "next/image";

interface Picture {
  src: string;
  alt?: string;
}

interface Props {
  pictures: Picture[];
}

const Gallery: React.FC<Props> = ({ pictures }) => {
  return (
    <div className="w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center">
      {pictures.map((pic, index) => (
        <div
          key={index}
          className="relative w-full aspect-square rounded-xl overflow-hidden border"
        >
          <Image
            src={pic.src}
            alt={pic.alt || `Gallery picture ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;