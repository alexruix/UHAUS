import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'social', title: 'Redes Sociales' },
    { name: 'seo', title: 'SEO Global' },
  ],
  fields: [
    defineField({
      name: 'site',
      title: 'Sitio',
      type: 'object',
      group: 'general',
      fields: [
        {name: 'title', title: 'Título', type: 'string'},
        {name: 'base_url', title: 'URL Base', type: 'string'},
        {name: 'base_path', title: 'Ruta Base', type: 'string'},
        {name: 'trailing_slash', title: 'Trailing Slash', type: 'boolean'},
        {name: 'favicon', title: 'Favicon', type: 'image', description: 'Debe ser cuadrado (ej. 32x32px)'},
        {name: 'logo', title: 'Logo', type: 'image'},
        {name: 'logo_width', title: 'Ancho del Logo', type: 'string'},
        {name: 'logo_height', title: 'Alto del Logo', type: 'string'},
        {name: 'logo_text', title: 'Texto del Logo', type: 'string'},
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'object',
          fields: [
            {name: 'number', title: 'Número de Teléfono', type: 'string', description: 'Incluye código de país (ej: 5492215747693)'},
            {name: 'message', title: 'Mensaje Personalizado', type: 'text', description: 'Ej: Hola quisiera consultar sobre...'}
          ]
        },
      ],
    }),
    defineField({
      name: 'params',
      title: 'Parámetros Globales',
      type: 'object',
      group: 'general',
      fields: [
        {name: 'footer_description', title: 'Descripción del Footer', type: 'text'},
        {name: 'phone', title: 'Teléfono', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'location', title: 'Ubicación', type: 'string'},
        {name: 'instagram', title: 'Instagram', type: 'string'},
        {name: 'contact_form_action', title: 'Acción del Formulario de Contacto', type: 'string'},
        {name: 'copyright', title: 'Copyright', type: 'string'},
      ],
    }),
    defineField({
      name: 'metadata',
      title: 'Metadatos (SEO)',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'meta_author', title: 'Autor Meta', type: 'string'},
        {name: 'meta_image', title: 'Imagen Meta (OG Image)', type: 'image', description: 'Se usa al compartir el link en redes sociales. Recomendado: 1200x630px en JPG o WebP.'},
        {
          name: 'meta_description', 
          title: 'Descripción Meta Global', 
          type: 'text',
          description: 'Esta descripción se usará si una página no tiene la suya propia. Recomendado: entre 120 y 160 caracteres.',
          validation: (Rule) => Rule.max(160).warning('Descripciones de más de 160 caracteres se truncarán en Google.'),
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Red Social',
          fields: [
            {name: 'network', title: 'Red', type: 'string'},
            {name: 'url', title: 'Enlace', type: 'url'}
          ]
        }
      ]
    }),
  ],
})
