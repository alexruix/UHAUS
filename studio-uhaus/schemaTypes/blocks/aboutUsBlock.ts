import {defineField, defineType} from 'sanity'

import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'aboutUsBlock',
  title: 'Sección Nosotros',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'content', title: 'Contenido', type: 'text'}),
    defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Nosotros',
        subtitle: 'Sección nosotros',
        media,
      }
    },
  },
})
