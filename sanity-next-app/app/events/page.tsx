import { mapEvent } from "@/sanity/mapper";
import { EVENTS_QUERY } from "@/sanity/queries/event";
import { sanityFetch } from "@/sanity/sanity";
import { SanityEvent } from "@/sanity/sanity.types";
import { EVENTS_QUERYResult } from "@/sanity/types";
import {
  faHeart,
  faLocationDot,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader } from "@nextui-org/react";
import Link from "next/link";

async function fetchEvents() {
  const response = await sanityFetch<EVENTS_QUERYResult>({
    query: EVENTS_QUERY,
  });

  if (!response) {
    return null;
  }

  return (response as any[]).map((event) => mapEvent(event));
}

export default async function Page() {
  const events = await fetchEvents();
  return (
    <>
      <h1 className="p-24 text-5xl">
        All our events <FontAwesomeIcon icon={faHeart} />
        <p className="text-xl">Showing {events?.length ?? 0} events</p>
      </h1>
      <div className="grid grid-cols-4 gap-5 p-24">
        {events?.map((event: SanityEvent, index: number) => {
          return (
            <Link href={"/events/" + (event.slug?.current ?? "")}>
              <Card
                key={index}
                className="shadow-none hover:bg-primary hover:text-white hover:shadow-lg"
              >
                <CardHeader className="flex flex-col items-start">
                  <h2 className="font-bold">{event.name}</h2>
                  {event.headline && (
                    <h3 className="italic">
                      <FontAwesomeIcon icon={faMicrophone} />{" "}
                      {event.headline.name}
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} />{" "}
                        {event.venue?.name}, {event.venue?.city} -{" "}
                        {event.venue?.country}
                      </p>
                    </h3>
                  )}
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
