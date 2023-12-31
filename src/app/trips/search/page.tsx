"use client";

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface getTripsParams {
  text: string;
  startDate: Date | null;
  budget: number | null;
}

async function getTrips(params: getTripsParams) {}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get(
          "startDate"
        )}&budget=${searchParams.get("budget")}`
      );
      const data = await response.json();
      setTrips(data);
    };
    fetchTrips();
  }, []);

  return (
    <div className='container mx-auto flex flex-col p-5 items-center lg:items-start lg:pt-10'>
      <h1 className='text-primaryDarker font-semibold text-xl lg:text-left lg:w-full lg:text-[2.5rem]'>
        Hospedagens encontradas
      </h1>
      <h2 className='text-grayPrimary font-medium mb-5 lg:mt-6 lg:w-full lg:text-left'>
        {trips.length > 0 ? "Listamos as melhores viagens para você!" : "Não encontramos nenhuma viagem."}
      </h2>

      <div className='flex flex-col pag-4 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16'>
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
