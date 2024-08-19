import {defineField, defineType, SanityClient} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from '../components/DoorsOpenInput'
import DescriptionBox from '../components/DescriptionBox'
import {OlistIcon} from '@sanity/icons'

type Venue = {
  name: string
  maxAmountOfPeople: number
}

async function validateDoorsOpen(value: any, context: any) {
  const venue = context.document?.venue as {_ref: string}
  const doorsOpen = value ?? 0
  if (context.document?.venue) {
    const venueRef = venue._ref
    const studioClient: SanityClient = context.getClient({apiVersion: 'v2023-08-07'})
    const response = await studioClient.fetch<Venue>(
      `*[_type=="venueType" && _id=="${venueRef}"][0] {maxAmountOfPeople}`,
    )
    if (doorsOpen > response.maxAmountOfPeople) {
      return (
        'Since sthe venue has ' +
        response.maxAmountOfPeople +
        ', the doors open must be less than this.'
      )
    }
    return true
  }
}

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic information',
      icon: OlistIcon,
      default: true,
    },
    {
      name: 'advanced',
      title: 'More information',
    },
  ],
  fieldsets: [
    {name: 'important', title: 'Important info', options: {columns: 2, collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: <DescriptionBox text="This is the name of the event" />,
      group: 'basic',
      fieldset: 'important',
      validation: (rule) =>
        rule
          .required()
          .warning("For clarity sake this should be descriptive of the event's purpose"),
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      group: 'basic',
      fieldset: 'important',
      validation: (rule) =>
        rule
          .required()
          .info('This field is important for distinguishing what this event is meant to be!'),
      options: {
        list: ['concert', 'art-venue', 'religious-gathering', 'local-buisness-venue'],
      },
      description: <DescriptionBox text={'What kind of event is this?'} />,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'basic',
      description: 'URL Slug for this event',
      validation: (rule) => rule.required().error('Slug for this event is required'),
      hidden: ({document}) => !document?.name,
      options: {
        source: 'name',
        maxLength: 200,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      group: 'basic',
      description: 'When will this be hosted?',
      validation: (rule) => rule.required(),
      type: 'datetime',
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      group: 'basic',
      description: 'How many tickets will be sold at this event?',
      initialValue: 60,
      validation: (rule) =>
        rule.custom((value: any, context: any) => {
          return validateDoorsOpen(value, context)
        }),
      components: {
        input: DoorsOpenInput,
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'basic',
    }),
    defineField({
      name: 'venue',
      group: 'basic',
      description: 'Where is this taking place?',
      type: 'reference',
      to: [{type: 'venue'}],
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'basic',
      readOnly: ({value, document}) => !value && document?.eventType !== 'concert',
      description: 'Who is playing at this event?',
    }),
    defineField({
      name: 'details',
      type: 'array',
      group: 'advanced',
      description: 'Some description of what this event is?',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tickets',
      title: 'Tickets',
      group: 'advanced',
      description: 'Where can i buy tickets for this event?',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      image: 'image',
      venue: 'venue.name',
      date: 'date',
    },
    prepare: ({title, image, venue, date}) => {
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
    },
  },
})
