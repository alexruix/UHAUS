import {defineField, defineType} from 'sanity'

import {BellIcon} from '@sanity/icons'

export default defineType({
  name: 'ctaBlock',
  title: 'Banner final (CTA)',
  type: 'object',
  icon: BellIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}}),
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
        title: title || 'Banner final (CTA)',
        subtitle: 'Banner final de web',
        media,
      }
    },
  },
})
