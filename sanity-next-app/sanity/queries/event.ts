import { groq } from "next-sanity";

export const EVENTS_QUERY = groq`*[_type=="event"] {...}`;

export const LATEST_EVENTS_QUERY = groq`*[_type=="event"] | order(date desc) [0..5] { 
    name,
    date, 
    slug,
    "imageUrl": image.asset->url,
    venue->{
        ...
    }    
}`;

export const EVENT_BY_SLUG_QUERY = groq`*[_type=="event" && slug.current==$slug] [0] {
    ...,
    venue->{
            ...
        },
    artists[]->{
        ...,
        "imageUrl": image.asset->url
    },
    "imageUrl": image.asset->url
}`;
