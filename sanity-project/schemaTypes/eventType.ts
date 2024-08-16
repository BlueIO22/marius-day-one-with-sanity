import { defineField, defineType, SanityClient } from "sanity";
import { CalendarIcon } from '@sanity/icons'
import { DoorsOpenInput } from "../components/DoorsOpenInput";

type Venue = {
    name: string;
    maxAmountOfPeople: number;
}

async function validateDoorsOpen(value: any, context: any) {
    const venue = context.document?.venue as { _ref: string };
    const doorsOpen = value ?? 0;
    if (context.document?.venue) {
        const venueRef = venue._ref
        const studioClient: SanityClient = context.getClient({ apiVersion: 'v2023-08-07' })
        const response = await studioClient.fetch<Venue>(`*[_type=="venueType" && _id=="${venueRef}"][0] {maxAmountOfPeople}`)
        if (doorsOpen > response.maxAmountOfPeople) {
            return 'Since sthe venue has ' + response.maxAmountOfPeople + ', the doors open must be less than this.'
        }
        return true;
    }
}

export const eventType = defineType({
    name: "event",
    title: 'Event',
    type: 'document',
    icon: CalendarIcon,
    groups: [
        {
            name: 'basic',
            title: 'Basic information',
            default: true
        },
        {
            name: 'advanced',
            title: 'More information'
        }
    ],
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            description: 'Name of the event',
            group: 'basic',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'eventType',
            type: 'string',
            group: 'advanced',
            options: {
                list: [
                    "concert",
                    "art-venue",
                    "religious-gathering",
                    "local-buisness-venue"
                ]
            },
            description: 'What kind of event is this?',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            group: 'basic',
            description: 'URL Slug for this event',
            validation: rule => rule.required().error("Slug for this event is required"),
            hidden: ({ document }) => !document?.name ?? false,
            options: {
                source: 'name',
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        }),
        defineField({
            name: 'date',
            title: 'Date',
            group: 'basic',
            description: 'When will this be hosted?',
            validation: rule => rule.required(),
            type: 'datetime'
        }),
        defineField({
            name: 'doorsOpen',
            type: 'number',
            group: 'basic',
            description: 'How many tickets will be sold at this event?',
            initialValue: 60,
            validation: rule => rule.custom((value: any, context: any) => {
                return validateDoorsOpen(value, context);
            }),
            components: {
                input: DoorsOpenInput
            }
        }),
        defineField({
            name: 'image',
            type: 'image',
            group: 'basic',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'venue',
            group: 'basic',
            description: 'Where is this taking place?',
            type: 'reference',
            to: [{ type: 'venueType' }]
        }),
        defineField({
            name: 'artists',
            type: 'array',
            group: 'basic',
            readOnly: ({ value, document }) => !value && document?.eventType !== "concert",
            description: 'Who is playing at this event?',
            of: [
                defineField({
                    name: 'artist',
                    type: 'reference',
                    to: [{ type: 'artist' }]
                })
            ]
        }),
        defineField({
            name: 'details',
            type: 'array',
            group: 'advanced',
            description: 'Some description of what this event is?',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'tickets',
            title: 'Tickets',
            group: 'advanced',
            description: 'Where can i buy tickets for this event?',
            type: 'url'
        })
    ],
    preview: ({
        select: {
            title: "name",
            image: "image",
            venue: "venue.name",
            date: "date"
        },
        prepare: ({ title, image, venue, date }) => {
            const name = title || 'Untitled event'
            const dateFormatted = date
                ? new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
                : 'No date'

            return {
                title: name,
                subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
                media: image || CalendarIcon,
            }
        }
    })
})