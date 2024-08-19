"use client";

import { SanityEvent } from "@/sanity/sanity.types";
import {
  faBookReader,
  faCalendar,
  faClock,
  faExclamationCircle,
  faGlobe,
  faLocation,
  faLocationDot,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  Link,
  Tooltip,
  Image,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import dayjs from "dayjs";

export default function EventCard({ event }: { event: SanityEvent }) {
  return (
    <Tooltip
      placement="right-start"
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
      <Link href={"/events/" + (event.slug?.current ?? "")}>
        <Card className="w-full shadow-none bg-primary rounded-none text-white">
          <CardHeader className="flex flex-row justify-between gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">{event.name}</h1>
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {event.venue?.name} -{" "}
                <FontAwesomeIcon icon={faCalendar} />{" "}
                {dayjs(event.date).format("DD. MMMM YYYY")}
              </p>
            </div>
            <div>
              <Button color="secondary" className="text-white">
                <FontAwesomeIcon icon={faTicket} /> Buy tickets now!
              </Button>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </Tooltip>
  );
}
