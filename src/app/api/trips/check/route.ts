import { prisma } from "@/lib/prisma";
import { differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });

  if (!trip) {
    return new NextResponse(JSON.stringify({ error: { code: "TRIP_NOT_FOUND" } }));
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(JSON.stringify({ error: { code: "INVALID_END_DATE" } }), { status: 400 });
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      //Check if the trip is already reserved
      startDate: {
        lte: new Date(req.startDate),
      },
      endDate: {
        gte: new Date(req.endDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(JSON.stringify({ error: { code: "TRIP_ALREADY_RESERVED" } }));
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice: differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(trip.pricePerDay),
    })
  );
}
