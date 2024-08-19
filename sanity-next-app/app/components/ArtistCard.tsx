import { Artist } from "@/sanity/sanity.types";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="w-[300px] max-h-[300px]">
      <Image
        src={
          artist.imageUrl ??
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        }
        className="object-cover object-center w-full brightness-50"
        alt={artist.name + " image"}
      />
      <CardHeader className="text-white w-[150px] top-1 absolute left-1">
        <h3 className="text-2xl font-bold">{artist.name}</h3>
      </CardHeader>
    </Card>
  );
}
