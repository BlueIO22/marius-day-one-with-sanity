import {defineField, defineType} from 'sanity'

export const venueType = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'city',
      description: 'In which city is this venue?',
      type: 'string',
    }),
    defineField({
      name: 'country',
      description: 'In which country is this venue?',
      type: 'string',
    }),
    defineField({
      name: 'maxAmountOfPeople',
      description: 'Max amount of people in the venue',
      type: 'number',
      deprecated: true,
    }),
  ],
  initialValue: {
    maxAmountOfPeople: 100,
  },
  preview: {
    select: {
      title: 'name',
      maxAmountOfPeople: 'maxAmountOfPeople',
    },
    prepare: ({title, maxAmountOfPeople}) => {
      return {
        title: title,
        subtitle: 'Max ' + maxAmountOfPeople + ' at this venue',
      }
    },
  },
})
