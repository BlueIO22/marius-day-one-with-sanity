import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venueType',
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
    ],
    preview: {
        select: {
            title: "name",
            maxAmountOfPeople: "maxAmountOfPeople"
        },
        prepare: ({ title, maxAmountOfPeople }) => {
            return {
                title: title,
                subtitle: "Max " + maxAmountOfPeople + " at this venue"
            }
        }
    }
})