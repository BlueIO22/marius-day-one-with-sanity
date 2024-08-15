import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'maxAmountOfPeople',
            description: 'Max amount of people in the venue',
            type: 'number',
            validation: rule => rule.required()
        })
    ]
})