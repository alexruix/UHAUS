import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import matter from "gray-matter";
import "dotenv/config";

// Sanity Client Config
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-05-23",
  token: process.env.SANITY_API_TOKEN,
});

const __dirname = path.resolve();

// Utility for uploading images
const uploadImage = async (imagePath) => {
  if (!imagePath) return null;
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(__dirname, "public", cleanPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(
      `⚠️ [WARNING] Imagen no encontrada localmente en: ${fullPath}`,
    );
    return null;
  }

  try {
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(fullPath),
      {
        filename: path.basename(fullPath),
      },
    );
    console.log(`✅ Imagen subida: ${cleanPath}`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Error subiendo ${cleanPath}:`, error.message);
    return null;
  }
};

const runSeeder = async () => {
  console.log("🚀 Iniciando migración de datos a Sanity...");

  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "❌ FALTA EL TOKEN: SANITY_API_TOKEN no está definido en el archivo .env",
    );
  }

  // 1. Mapeo de Settings (global.json)
  console.log("\n⚙️  Procesando Settings (global.json)...");
  const settingsRaw = fs.readFileSync(
    path.join(__dirname, "src/content/settings/global.json"),
    "utf-8",
  );
  const settingsData = JSON.parse(settingsRaw);

  const settingsDoc = {
    _id: "settings", // ID fijo para el documento singleton
    _type: "settings",
    site: {
      title: settingsData.site.title,
      base_url: settingsData.site.base_url,
      base_path: settingsData.site.base_path,
      trailing_slash: settingsData.site.trailing_slash,
      favicon: await uploadImage(settingsData.site.favicon),
      logo: await uploadImage(settingsData.site.logo),
      logo_width: settingsData.site.logo_width,
      logo_height: settingsData.site.logo_height,
      logo_text: settingsData.site.logo_text,
      whatsapp: {
        number: settingsData.site.whatsapp?.number || "",
        message: settingsData.site.whatsapp?.message || "",
      },
    },
    params: settingsData.params,
    metadata: {
      meta_author: settingsData.metadata.meta_author,
      meta_image: await uploadImage(settingsData.metadata.meta_image),
      meta_description: settingsData.metadata.meta_description,
    },
    social: [
      { network: "facebook", url: settingsData.social.facebook },
      { network: "twitter", url: settingsData.social.twitter },
      { network: "instagram", url: settingsData.social.instagram },
      { network: "linkedin", url: settingsData.social.linkedin },
      { network: "whatsapp", url: settingsData.social.whatsapp },
    ]
      .filter((s) => s.url)
      .map((s, i) => ({ ...s, _key: "soc_" + i })),
  };

  console.log("Subiendo documento Settings...");
  await client.createOrReplace(settingsDoc);
  console.log("✅ Settings migradas con éxito.");

  // 2. Mapeo de Homepage (index.md)
  console.log("\n🏠 Procesando Homepage (index.md)...");
  const homepageRaw = fs.readFileSync(
    path.join(__dirname, "src/content/homepage/index.md"),
    "utf-8",
  );
  const { data: frontmatter } = matter(homepageRaw);

  const pageBuilder = [];

  // Hero Block
  if (frontmatter.hero) {
    pageBuilder.push({
      _type: "heroBlock",
      _key: "hero_" + Date.now(),
      title: frontmatter.hero.title,
      image: await uploadImage(frontmatter.hero.image),
      buttons:
        frontmatter.hero.buttons?.map((b, i) => ({ ...b, _key: "btn_" + i })) ||
        [],
      content: frontmatter.hero.content || "",
    });
  }

  // Banner Block
  if (frontmatter.banner && frontmatter.banner.length > 0) {
    const bannerItems = await Promise.all(
      frontmatter.banner.map(async (b, i) => ({
        _key: "banner_" + i,
        title: b.title,
        subtitle: b.subtitle,
        icon: b.icon,
        image: await uploadImage(b.image),
      })),
    );
    pageBuilder.push({
      _type: "bannerBlock",
      _key: "bannerBlock_" + Date.now(),
      bannerItems,
    });
  }

  // About Us Block
  if (frontmatter.about_us) {
    pageBuilder.push({
      _type: "aboutUsBlock",
      _key: "aboutUs_" + Date.now(),
      title: frontmatter.about_us.title,
      content: frontmatter.about_us.content,
      image: await uploadImage(frontmatter.about_us.image),
    });
  }

  // We Apply Block
  if (frontmatter.we_apply) {
    const feature_list = await Promise.all(
      frontmatter.we_apply.feature_list.map(async (f, i) => ({
        _key: "weapply_" + i,
        title: f.title,
        content: f.content,
        icon: f.icon,
        image: await uploadImage(f.image),
      })),
    );
    pageBuilder.push({
      _type: "weApplyBlock",
      _key: "weApply_" + Date.now(),
      title: frontmatter.we_apply.title,
      feature_list,
    });
  }

  // Choice Us Block
  if (frontmatter.choice_us || frontmatter.choise_us) {
    const cuData = frontmatter.choice_us || frontmatter.choise_us;
    pageBuilder.push({
      _type: "choiceUsBlock",
      _key: "choiceUs_" + Date.now(),
      title: cuData.title,
      description: cuData.description || "",
      list:
        cuData.list?.map((l, i) => ({
          _key: "choice_" + i,
          organization: String(l.organization),
          content: String(l.content),
        })) || [],
    });
  }

  // Benefits Block
  if (frontmatter.benefits) {
    const items = await Promise.all(
      frontmatter.benefits.items.map(async (b, i) => {
        let video = null;
        if (b.video) {
          video = {
            thumbnail: await uploadImage(b.video.thumbnail),
            video_path: b.video.video_path || "",
          };
        }
        return {
          _key: "benefit_" + i,
          title: String(b.title),
          description: String(b.description),
          video,
        };
      }),
    );
    pageBuilder.push({
      _type: "benefitsBlock",
      _key: "benefits_" + Date.now(),
      head: frontmatter.benefits.head,
      items,
    });
  }

  // Graph Block
  if (frontmatter.graph) {
    pageBuilder.push({
      _type: "graphBlock",
      _key: "graph_" + Date.now(),
      head: frontmatter.graph.head,
      description: frontmatter.graph.description || "",
      items:
        frontmatter.graph.items?.map((i, idx) => ({
          _key: "graph_item_" + idx,
          title: i.title,
          content: i.content,
          icon: i.icon,
          color: i.color,
        })) || [],
      future:
        (frontmatter.graph.future || frontmatter.graph.futuro)?.map(
          (f, idx) => ({
            _key: "future_" + idx,
            title: f.title,
            content: f.content,
          }),
        ) || [],
    });
  }

  // Application Types Block
  if (frontmatter.application_types) {
    const items = await Promise.all(
      frontmatter.application_types.items.map(async (at, i) => ({
        _key: "apptype_" + i,
        title: at.title,
        content: at.content,
        image: await uploadImage(at.image),
      })),
    );
    pageBuilder.push({
      _type: "applicationTypesBlock",
      _key: "appTypes_" + Date.now(),
      head: frontmatter.application_types.head,
      items,
    });
  }

  // CTA Block
  if (frontmatter.cta) {
    pageBuilder.push({
      _type: "ctaBlock",
      _key: "cta_" + Date.now(),
      title: frontmatter.cta.title,
      image: await uploadImage(frontmatter.cta.image),
      buttons:
        frontmatter.cta.buttons?.map((b, idx) => ({
          ...b,
          _key: "cta_btn_" + idx,
        })) || [],
    });
  }

  const homepageDoc = {
    _id: "homepage", // ID fijo singleton
    _type: "homepage",
    title: frontmatter.title || "U HAUS",
    meta_title: frontmatter.meta_title || "",
    description: frontmatter.description || "",
    pageBuilder,
  };

  console.log("Subiendo documento Homepage...");
  await client.createOrReplace(homepageDoc);
  console.log("✅ Homepage migrada con éxito.");

  console.log(
    "🎉 ¡MIGRACIÓN COMPLETADA! Entra a Sanity Studio para ver tus datos.",
  );
};

runSeeder().catch((err) => {
  console.error("❌ ERROR EN LA MIGRACIÓN:", err.message);
});
