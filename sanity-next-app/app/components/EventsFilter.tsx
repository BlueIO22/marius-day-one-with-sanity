"use client";

import { SanityEvent } from "@/sanity/sanity.types";
import { Card, Input, Select, SelectItem } from "@nextui-org/react";

type Genre = {
  label: string;
  id: number;
};

export default function EventsFilter({ events }: { events: SanityEvent[] }) {
  const genres: Genre[] = [
    {
      label: "Rock",
      id: 1,
    },
    {
      label: "Pop",
      id: 2,
    },
    {
      label: "Classical",
      id: 3,
    },
    {
      label: "Jazz",
      id: 4,
    },
  ];

  return (
    <Card className="p-5 mb-5 shadow-none rounded-none text-black text-xl flex flex-row justify-between items-center">
      <p>{events.length} upcomming events</p>
      <Select
        items={genres}
        label="Filter by genre"
        placeholder="Select a genre"
        className="max-w-xs"
      >
        {(genre) => <SelectItem key={genre.id}>{genre.label}</SelectItem>}
      </Select>
      <Input
        className="w-[300px] border-2 border-white"
        variant="flat"
        radius="none"
        placeholder="Search for event"
      />
    </Card>
  );
}
