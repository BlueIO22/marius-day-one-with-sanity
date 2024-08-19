import { mapEvent } from "@/sanity/mapper";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/queries/event";
import { sanityClient } from "@/sanity/sanity";
import { Artist, SanityEvent } from "@/sanity/sanity.types";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "@nextui-org/react";
import { PortableText } from "next-sanity";
import dayjs from "dayjs";
import ArtistCard from "@/app/components/ArtistCard";
import Link from "next/link";

async function fetchEventBySlug(slug: string) {
  const response = await sanityClient.fetch(EVENT_BY_SLUG_QUERY, {
    slug: slug,
  });

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
          <Link href={"/"} className="w-[200px] mb-5">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to events
          </Link>
          <div className=" mb-5 flex justify-start flex-col">
            <h1 className="text-3xl font-bold mb-5">{event.name}</h1>

            <PortableText value={event.details ?? []} />
          </div>
          <Image
            className="max-h-[800px]"
            src={event.imageUrl}
            alt={event.name + " main image"}
          />
        </div>
        <div className="bg-white text-black p-10 ml-10 shadow-xl">
          <h2 className="font-bold">{event.name}</h2>
          <p>
            <FontAwesomeIcon icon={faClock} />{" "}
            {dayjs(event.date).format("DD.MMMM YYYY HH:mm")}
          </p>
          <div className="mt-5 overflow-y-auto  max-h-[500px]">
            <p className="font-bold mb-5">Artists</p>
            <div className="flex flex-col gap-5">
              {event.artists?.map((artist: Artist, index: number) => {
                return <ArtistCard key={index} artist={artist} />;
              })}
            </div>
          </div>

          <Link href={event.tickets ?? "/"}>
            <Button variant="solid" className="mt-10 text-xl font-bold">
              Buy tickets now!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
