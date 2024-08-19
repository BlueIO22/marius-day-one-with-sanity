import { Card, CardBody, CardHeader } from "@nextui-org/react";
import EventCard from "./components/EventCard";
import { sanityFetch } from "@/sanity/sanity";
import { LATEST_EVENTS_QUERY } from "@/sanity/queries/event";
import { mapEvent } from "@/sanity/mapper";
import EventsFilter from "./components/EventsFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

async function fetchLatestEvents() {
  const response = await sanityFetch({ query: LATEST_EVENTS_QUERY });

  if (!response) {
    return null;
  }

  return (response as any[]).map((event) => mapEvent(event));
}

export default async function Home() {
  const events = await fetchLatestEvents();

  return (
    <main className="flex min-h-screen flex-col items-center  p-5">
      <Card className="rounded-none shadow-none p-10">
        <CardHeader className="text-5xl">
          <h1>
            <FontAwesomeIcon icon={faCalendar} /> Our events
          </h1>
        </CardHeader>
      </Card>
      <Card className="rounded-none p-10 bg-white shadow-none  ">
        <CardHeader className="p-0 mb-5">
          <h2 className="text-3xl">Upcomming events!</h2>
        </CardHeader>
        {events && (
          <>
            <CardBody className="flex flex-col gap-5 w-full">
              {events?.map((event, index) => {
                return <EventCard event={event} key={index} />;
              })}
            </CardBody>
          </>
        )}
      </Card>
    </main>
  );
}
