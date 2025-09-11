import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./public/images/icons";   // Carpeta donde están tus imágenes
const outputDir = "./public/images/icons"; // Carpeta destino optimizadas

// Asegúrate que exista la carpeta de salida
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extensiones a convertir
const validExt = [".png", ".jpg", ".jpeg"];

fs.readdirSync(inputDir).forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if (validExt.includes(ext)) {
    const name = path.basename(file, ext);
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${name}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 65 }) // podés bajar calidad a 60 si querés aún menos peso
        .toFile(outputPath);

      console.log(`✅ Convertido: ${file} → ${name}.webp`);
    } catch (err) {
      console.error(`❌ Error al convertir ${file}:`, err);
    }
  }
});
