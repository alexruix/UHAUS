import {defineField, defineType} from 'sanity'

import {ChartUpwardIcon} from '@sanity/icons'

export default defineType({
  name: 'graphBlock',
  title: 'Gráfico de Compromiso',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({name: 'head', title: 'Cabecera', type: 'string'}),
    defineField({name: 'description', title: 'Descripción', type: 'text'}),
    defineField({
      name: 'items',
      title: 'Items Principales',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Item Principal',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'content', title: 'Contenido', type: 'text'},
            {name: 'icon', title: 'Icono', type: 'string'},
            {name: 'color', title: 'Color', type: 'string'},
            {
              name: 'button',
              title: 'Botón',
              type: 'object',
              fields: [
                {name: 'label', title: 'Etiqueta', type: 'string'},
                {name: 'link', title: 'Enlace', type: 'string'},
                {name: 'outline', title: 'Es Outline', type: 'boolean'},
                {name: 'enable', title: 'Habilitado', type: 'boolean'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'future',
      title: 'Items de Futuro',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Item de Futuro',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'content', title: 'Contenido', type: 'text'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'head',
    },
    prepare({title}) {
      return {
        title: title || 'Gráfico de Compromiso',
        subtitle: 'Sección Compromiso, Misión y Visión',
      }
    },
  },
})
