import { defineCollection, z } from "astro:content";

// Homepage schema
const homepageSchema = z.object({
  hero: z.object({
    title: z.string(),
    image: z.string(),
    buttons: z.array(
      z.object({
        label: z.string(),
        icon: z.string().optional(),
        enable: z.boolean(),
      })
    ),
    content: z.string().optional(),
  }),
  banner: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      icon: z.string(),
      image: z.string(),
    })
  ),
  about_us: z.object({
    title: z.string(),
    content: z.string(),
    image: z.string(),
  }),
  we_apply: z.object({
    title: z.string(),
    feature_list: z.array(
      z.object({
        icon: z.string(),
        image: z.string(),
        title: z.string(),
        content: z.string(),
      })
    ),
  }),
  choise_us: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    list: z.array(
      z.object({
        author: z.any(),
        avatar: z.string().nullable().optional(),
        organization: z.string(),
        content: z.string(),
      })
    ),
  }),
  benefits: z.object({
    head: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        video: z.object({
          thumbnail: z.string(),
          video_path: z.string(),
        }),
      })
    ),
  }),
  graph: z.object({
    head: z.string(),
    description: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
        icon: z.string(),
        color: z.string(),
        button: z
          .object({
            label: z.string(),
            link: z.string(),
            outline: z.boolean(),
            enable: z.boolean(),
          })
          .optional(),
      })
    ),
    futuro: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    ),
  }),
  application_types: z.object({
    head: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
      })
    ),
  }),
  cta: z.object({
    title: z.string(),
    image: z.string(),
    buttons: z.array(
      z.object({
        label: z.string(),
        icon: z.string(),
        enable: z.boolean(),
      })
    ),
  }),
  title: z.string().optional(),
  meta_title: z.string().optional(),
  description: z.string().optional(),
});

// Settings schema
const settingsSchema = z.object({
  site: z.object({
    title: z.string(),
    base_url: z.string(),
    base_path: z.string(),
    trailing_slash: z.boolean(),
    favicon: z.string(),
    logo: z.string(),
    logo_width: z.string(),
    logo_height: z.string(),
    logo_text: z.string(),
    whatsapp: z.string(),
  }),
  params: z.object({
    footer_description: z.string(),
    phone: z.string(),
    email: z.string(),
    location: z.string(),
    instagram: z.string(),
    contact_form_action: z.string(),
    copyright: z.string(),
  }),
  metadata: z.object({
    meta_author: z.string(),
    meta_image: z.string(),
    meta_description: z.string(),
  }),
  social: z.record(z.string()).optional(),
});

// Blog collection schema
const blogCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  homepage: defineCollection({
    type: "content",
    schema: homepageSchema,
  }),
  settings: defineCollection({
    type: "data",
    schema: settingsSchema,
  }),
  pages: pagesCollection,
  blog: blogCollection,
};
