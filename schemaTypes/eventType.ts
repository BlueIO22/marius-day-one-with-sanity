import { defineField, defineType, SanityClient } from "sanity";

type Venue = {
    name: string; 
    maxAmountOfPeople: number;
}

async function validateDoorsOpen(value: any, context: any) {
    const venue = context.document?.venue as {_ref: string};
    const doorsOpen = value ?? 0;
    if (context.document?.venue) {
        const venueRef = venue._ref 
        const studioClient: SanityClient = context.getClient({apiVersion: 'v2023-08-07'})
        const response = await studioClient.fetch<Venue>(`*[_type=="venue" && _id=="${venueRef}"][0] {maxAmountOfPeople}`)
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
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            description: 'Name of the event',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'eventType',
            type: 'string',
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
            description: 'URL Slug for this event',
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
            description: 'When will this be hosted?',
            validation: rule => rule.required(),
            type: 'datetime'
        }),
        defineField({
            name: 'doorsOpen',
            type: 'number',
            initialValue: 60,
            validation: rule => rule.custom((value, context) => {
                 return validateDoorsOpen(value, context);
             })
        }),
        defineField({
            name: 'image',
            type: 'image'
        }),
        defineField({
            name: 'venue',
            description: 'Where is this taking place?',
            type: 'reference',
            to: [{type: 'venue'}]
        }),
        defineField({
            name: 'artists',
            type: 'array',
            description: 'Who is playing at this event?',
            of: [
                defineField({
                    name: 'artist',
                    type: 'reference',
                    to: [{type:'artist'}]
                })
            ]
        }),
        defineField({
            name: 'details',
            type: 'array',
            description: 'Some description of what this event is?',
            of:[{type: 'block'}]
        }),
        defineField({
            name: 'tickets',
            title: 'Tickets',
            description: 'Where can i buy tickets for this event?',
            type: 'url'
        })
    ]
})