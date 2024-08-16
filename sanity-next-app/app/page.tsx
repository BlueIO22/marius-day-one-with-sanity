import { Card, CardBody, CardHeader } from "@nextui-org/react";
import EventCard from "./components/EventCard";
import { sanityClient } from "@/sanity/sanity";
import { LATEST_EVENTS_QUERY } from "@/sanity/queries/event";
import { mapEvent } from "@/sanity/mapper";
import EventsFilter from "./components/EventsFilter";

async function fetchLatestEvents() {
  const response = await sanityClient.fetch(LATEST_EVENTS_QUERY);

  console.log(response);

  if (!response) {
    return null;
  }

  return (response as any[]).map((event) => mapEvent(event));
}

export default async function Home() {
  const events = await fetchLatestEvents();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Card className="rounded-none shadow-none p-10 bg-primary text-white">
        <CardHeader className="text-5xl">Our events</CardHeader>
      </Card>
      <Card className="rounded-none p-10 bg-white shadow-none  ">
        <CardHeader className="p-0 mb-5">
          <h2 className="text-3xl">Upcomming events!</h2>
        </CardHeader>
        {events && (
          <>
            <EventsFilter events={events} />

            <CardBody className="grid grid-cols-3 gap-5 w-full">
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
