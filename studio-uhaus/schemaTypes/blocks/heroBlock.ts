import {defineField, defineType} from 'sanity'

import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'heroBlock',
  title: 'Banner Principal (Hero)',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}}),
    defineField({name: 'content', title: 'Contenido', type: 'text'}),
    defineField({
      name: 'buttons',
      title: 'Botones',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Botón',
          fields: [
            {name: 'label', title: 'Etiqueta', type: 'string'},
            {name: 'icon', title: 'Icono', type: 'string'},
            {name: 'enable', title: 'Habilitado', type: 'boolean'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Banner Principal',
        subtitle: 'Banner Principal (Hero)',
        media,
      }
    },
  },
})
