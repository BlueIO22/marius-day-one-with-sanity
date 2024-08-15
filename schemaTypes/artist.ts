import { defineField, defineType } from "sanity";

export const artist = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            description: 'Name of artist',
            title: 'Name',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'age',
            type: 'number',
            description: 'Age of artist'
        }),
        defineField({
            type: 'string',
            name: 'genre',
            title: 'Genre',
            validation: rule => rule.custom((genre, context) => {
                if (genre=="classical") {
                    const age = context.document?.age ?? 0
                    return (age as number) > 100 ? true : 'Sorry mate, you have to be over a houndred years to do be a classical artist';
                }
                return true;
            }),
            options: {
                list: [
                    "rock",
                    "pop",
                    "r&b",
                    "classical"
                ]
            }
        })
    ]
})