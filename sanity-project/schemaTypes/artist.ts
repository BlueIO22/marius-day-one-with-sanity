import { defineField, defineType } from "sanity";
import { RobotIcon } from '@sanity/icons'

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
            type: "image",
            name: "image",
            description: "What does this artist look like?",
        }),
        defineField({
            type: 'string',
            name: 'genre',
            title: 'Genre',
            validation: rule => rule.custom((genre, context) => {
                if (genre == "classical") {
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
    ],
    preview: {
        select: {
            title: "name",
            genre: "genre",
            image: "image",
        },
        prepare: ({ title, genre, image }) => {
            return {
                title,
                subtitle: "is a " + genre + " artist",
                media: image || RobotIcon
            }
        }
    }
})