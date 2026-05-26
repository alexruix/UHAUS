import {defineField, defineType} from 'sanity'

import {ThLargeIcon} from '@sanity/icons'

export default defineType({
  name: 'applicationTypesBlock',
  title: 'Tipos de aplicación',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({name: 'head', title: 'Cabecera', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Tipo de aplicación',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'content', title: 'Contenido', type: 'text'},
            {name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'head',
      items: 'items',
    },
    prepare({title, items}) {
      const itemCount = items ? items.length : 0
      return {
        title: title || 'Tipos de aplicación',
        subtitle: `Tipos de aplicación (${itemCount} items)`,
      }
    },
  },
})
