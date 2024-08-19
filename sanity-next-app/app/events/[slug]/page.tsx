import { mapEvent } from "@/sanity/mapper";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/queries/event";
import { sanityClient } from "@/sanity/sanity";
import { Artist, SanityEvent } from "@/sanity/sanity.types";
import {
  faArrowLeft,
  faClock,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Chip, Image, ScrollShadow } from "@nextui-org/react";
import { PortableText } from "next-sanity";
import dayjs from "dayjs";
import ArtistCard from "@/app/components/ArtistCard";
import Link from "next/link";

async function fetchEventBySlug(slug: string) {
  const response = await sanityClient.fetch(EVENT_BY_SLUG_QUERY, {
    slug: slug,
  });

  console.log(response);

  if (!response) {
    return;
  }

  return mapEvent(response);
}

export default async function Page({ params }: { params: any }) {
  const slug = params.slug;

  const event = (await fetchEventBySlug(slug)) as SanityEvent | undefined;

  if (!event) {
    return <p>Could not locate event</p>;
  }

  return (
    <div className=" p-[20px] ">
      <div className="p-[100px] flex flex-row ">
        <div className="container w-[50%] flex flex-col">
          <Link href={"/events"} className="w-[200px] mb-5">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to events
          </Link>

          <div className="bg-white max-w-[400px] text-black p-10  shadow-xl flex flex-col  justify-between">
            <div>
              {event.headline && (
                <div className="flex flex-col gap-5">
                  <ArtistCard artist={event.headline} />
                  <ScrollShadow className="h-[200px] ">
                    <p>
                      {(event.headline?.description ?? "").length > 0
                        ? event.headline?.description
                        : "No description available for this artist"}
                    </p>
                  </ScrollShadow>
                </div>
              )}
              <h2 className="font-bold mt-5">{event.name}</h2>
              <p>
                <FontAwesomeIcon icon={faClock} />{" "}
                {dayjs(event.date).format("DD.MMMM YYYY HH:mm")}
              </p>
              {event.venue && (
                <>
                  <p className="mt-5">
                    This concert will be held at{" "}
                    <span className="border-b-1 border-b-black border-dashed">
                      {event.venue.name}
                    </span>
                  </p>
                  <Chip className="p-2 mt-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {event.venue.city}
                    {event.venue.country && (
                      <span>, {event.venue.country}</span>
                    )}
                  </Chip>
                </>
              )}
            </div>

            <Link className="w-[200px]" href={event.tickets ?? "/"}>
              <Button
                variant="solid"
                className="mt-10 bg-primary  text-white text-lg font-bold"
              >
                Buy tickets now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
