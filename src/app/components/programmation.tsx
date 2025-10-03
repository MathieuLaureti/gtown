import React from "react";
import Image from "next/image";

interface Person {
  picture: string;
  name: string;
  description: string;
}

interface Props {
  people: Person[];
}

const Programmation: React.FC<Props> = ({ people }) => {
  return (
    <div className="w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 px-12 place-items-center ">
      {people.map((person, index) => (
        <div
          key={index}
          className="relative w-64 aspect-square rounded-xl overflow-hidden border"
        >
          <Image
            src={person.picture}
            alt={person.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 flex flex-col items-center">
            <h3 className="font-bold text-md text-center">{person.name}</h3>
            <p className="text-xs text-center">{person.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Programmation;