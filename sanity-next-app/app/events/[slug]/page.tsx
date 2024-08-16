import { mapEvent } from "@/sanity/mapper";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/queries/event";
import { sanityClient } from "@/sanity/sanity";
import { SanityEvent } from "@/sanity/sanity.types";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "@nextui-org/react";
import { PortableText } from "next-sanity";
import dayjs from "dayjs";

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
    <div className="p-[100px] bg-primary flex flex-row">
      <div className="container w-[50%] flex flex-col  text-white">
        <div className=" mb-5 flex justify-start flex-col">
          <h1 className="text-3xl font-bold mb-5">{event.name}</h1>
          <p className="text-xl max-w-[80%]">
            {<PortableText value={event.details ?? []} />}
          </p>
        </div>
        <Image
          className="max-h-[600px]"
          src={event.imageUrl}
          alt={event.name + " main image"}
        />
      </div>
      <div className="bg-white text-black p-10">
        <h2 className="font-bold">{event.name}</h2>
        <p>
          <FontAwesomeIcon icon={faClock} />{" "}
          {dayjs(event.date).format("DD.MMMM YYYY HH:mm")}
        </p>
      </div>
    </div>
  );
}
