"use client";

import { SanityEvent } from "@/sanity/sanity.types";
import {
  faClock,
  faExclamationCircle,
  faGlobe,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  Link,
  Tooltip,
  Image,
  Button,
} from "@nextui-org/react";
import dayjs from "dayjs";

export default function EventCard({ event }: { event: SanityEvent }) {
  const { name, venue, date, slug } = event;

  if (!slug) {
    return null;
  }

  return (
    <Tooltip
      placement="bottom-start"
      content={
        <div className="p-2 backdrop-blur-3xl">
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} /> Booking is still
            available, but only until{" "}
            {dayjs(event.date).subtract(2, "days").format("DD.MMMM YYYY")}!
          </p>
        </div>
      }
      className="rounded-none shadow-lg border-2 "
    >
      <Link href={"/events/" + slug.current}>
        <Card className="max-h-[600px] hover:shadow-lg ">
          <Image
            width="full"
            className="object-cover object-center"
            alt="some image"
            src={event.imageUrl}
          />
          <CardHeader className="flex flex-col bg-5 justify-start items-start backdrop-blur-xl absolute top-5 left-5 w-[60%] rounded-lg bg-white text-black">
            <h2 className="font-bold">{name}</h2>
            {venue && (
              <p className="text-xs">
                <FontAwesomeIcon icon={faLocationDot} /> {venue.name} -{" "}
                <FontAwesomeIcon icon={faClock} />{" "}
                {dayjs(date).format("DD.MMMM YYYY")}
              </p>
            )}
            <Button color="primary" variant="shadow" className="mt-2">
              Buy tickets now!
            </Button>
          </CardHeader>
        </Card>
      </Link>
    </Tooltip>
  );
}
