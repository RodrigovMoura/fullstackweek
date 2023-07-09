import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Trip } from "@prisma/client";

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full lg:hidden'>
        <Image src={trip.coverImage} alt={trip.name} fill style={{ objectFit: "cover" }} />
      </div>

      {/* Imagens do topo */}
      <div className='hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2'>
        <div className='relative row-span-2'>
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className='rounded-tl-lg rounded-bl-lg shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[0]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className='shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[1]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className='shadow-md  rounded-tr-lg'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[2]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className='shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className='shadow-md  rounded-br-lg'
          />
        </div>
      </div>

      {/* Titulo e informações */}
      <div className='flex flex-col p-5 lg:order-1 lg:p-0 lg:mb-10'>
        <h1 className='font-semibold text-xl text-primaryDarker lg:text-3xl'>{trip.name}</h1>

        <div className='flex items-center gap-2 my-1'>
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className='text-xs text-grayPrimary lg:text-base underline'>{trip.location}</p>
        </div>

        <p className='text-xs text-grayPrimary lg:hidden'>
          <span className='text-primary font-medium'>R${trip.pricePerDay.toString()} </span>
          por noite
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
