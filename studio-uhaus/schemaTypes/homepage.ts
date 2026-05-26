import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Página principal',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'content', title: 'Contenido / Page Builder' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      description: 'Nombre interno para identificar este documento en Sanity.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Título (SEO)',
      description: 'El título principal que aparecerá en Google y al compartir en redes sociales. Recomendado: entre 50 y 60 caracteres.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Los títulos mayores a 60 caracteres suelen cortarse en Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Meta (SEO)',
      description: 'Resumen de la página que aparece debajo del título en Google. Recomendado: entre 120 y 160 caracteres.',
      type: 'text',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Descripciones de más de 160 caracteres se truncarán en Google.'),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructor de Página (Bloques)',
      description: 'Arma y reordena las secciones de tu página principal.',
      type: 'array',
      group: 'content',
      of: [
        {type: 'heroBlock'},
        {type: 'bannerBlock'},
        {type: 'aboutUsBlock'},
        {type: 'weApplyBlock'},
        {type: 'choiceUsBlock'},
        {type: 'benefitsBlock'},
        {type: 'graphBlock'},
        {type: 'applicationTypesBlock'},
        {type: 'ctaBlock'},
        {type: 'sliderBlock'},
      ],
    }),
  ],
})
