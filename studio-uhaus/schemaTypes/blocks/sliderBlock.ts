import {defineField, defineType} from 'sanity'

import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'sliderBlock',
  title: 'Carrusel de Imágenes',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'sliderItems',
      title: 'Items del Slider',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Slide',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'subtitle', title: 'Subtítulo', type: 'string'},
            {name: 'image', title: 'Imagen de Fondo', type: 'image', options: {hotspot: true}},
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      items: 'sliderItems',
    },
    prepare({items}) {
      const itemCount = items ? items.length : 0
      const firstItem = items && items[0]
      return {
        title: `Carrusel (${itemCount} slides)`,
        subtitle: 'Carrusel de Imágenes',
        media: firstItem ? firstItem.image : undefined,
      }
    },
  },
})
