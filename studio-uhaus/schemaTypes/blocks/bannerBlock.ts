import {defineField, defineType} from 'sanity'

import {PresentationIcon} from '@sanity/icons'

export default defineType({
  name: 'bannerBlock',
  title: 'Banda de Destacados (Banner)',
  type: 'object',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'bannerItems',
      title: 'Items del Banner',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Elemento del Banner',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'subtitle', title: 'Subtítulo', type: 'string'},
            {name: 'icon', title: 'Icono', type: 'string'},
            {name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: 'bannerItems',
    },
    prepare({items}) {
      const itemCount = items ? items.length : 0
      return {
        title: `Listado (${itemCount} items)`,
        subtitle: 'Servicios (Banner)',
      }
    },
  },
})
