import {defineField, defineType} from 'sanity'

import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'benefitsBlock',
  title: 'Trabajos',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({name: 'head', title: 'Cabecera', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Beneficio',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'description', title: 'Descripción', type: 'text'},
            {
              name: 'video',
              title: 'Video',
              type: 'object',
              fields: [
                {name: 'thumbnail', title: 'Miniatura', type: 'image', options: {hotspot: true}},
                {name: 'video_path', title: 'Ruta del Video', type: 'string'},
              ],
            },
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
        title: title || 'Nuestro trabajo',
        subtitle: `Listado de (${itemCount} items)`,
      }
    },
  },
})
