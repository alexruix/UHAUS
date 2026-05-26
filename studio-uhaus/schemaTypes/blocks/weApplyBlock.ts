import {defineField, defineType} from 'sanity'

import {CheckmarkCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'weApplyBlock',
  title: 'Dónde Aplicamos',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({
      name: 'feature_list',
      title: 'Lista de Características',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Característica',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'content', title: 'Contenido', type: 'text'},
            {name: 'icon', title: 'Icono', type: 'string'},
            {name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Dónde aplicamos',
        subtitle: 'Sección imágenes',
      }
    },
  },
})
