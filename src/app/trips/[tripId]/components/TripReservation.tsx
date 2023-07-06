"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  trip: Trip;
}

interface TripReservationForm {
  guests: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("http://localhost:3000/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: trip.id,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", { message: "Esta data já está reservada.", type: "manual" });
      setError("endDate", { message: "Esta data já está reservada.", type: "manual" });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      setError("startDate", { message: "Data inválida.", type: "manual" });
      setError("endDate", { message: "Data inválida.", type: "manual" });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      setError("endDate", { message: "Data inválida.", type: "manual" });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className='flex flex-col px-5 '>
      <div className='flex gap-4'>
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data de início'
              className='w-full'
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              minDate={trip.startDate}
            />
          )}
        />

        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data final'
              className='w-full'
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              minDate={startDate ?? trip.startDate}
              maxDate={trip.endDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Campo obrigatório",
          },
        })}
        placeholder={`Numero de hóspedes (Max: ${trip.maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>
          Total de dias {startDate && endDate ? ` ${differenceInDays(endDate, startDate)}` : "0"}{" "}
        </p>
        <p className='font-medium text-sm text-primaryDarker'>
          {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * Number(trip.pricePerDay)}` : "R$ 0"}
        </p>
      </div>

      <div className='pb-10 border-b border-grayLighter w-full'>
        <Button onClick={() => handleSubmit(onSubmit)()} className='mt-3 w-full'>
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
