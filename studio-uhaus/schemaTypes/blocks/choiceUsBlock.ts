import {defineField, defineType} from 'sanity'

import {StarIcon} from '@sanity/icons'

export default defineType({
  name: 'choiceUsBlock',
  title: 'Por qué elegirnos',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'description', title: 'Descripción', type: 'text'}),
    defineField({
      name: 'list',
      title: 'Lista',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Testimonio / Cliente',
          fields: [
            {name: 'organization', title: 'Organización / Autor', type: 'string'},
            {name: 'content', title: 'Contenido', type: 'text'},
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
        title: title || 'Por qué elegirnos',
        subtitle: 'Sección por qué elegirnos',
      }
    },
  },
})
