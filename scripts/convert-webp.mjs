import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const files = [
  'public/images/apply/residencial.jpeg',
  'public/images/apply/industrial.jpg',
  'public/images/apply/comercial.jpeg',
  'public/images/apply/bannerCTA.jpeg'
];

async function convert() {
  for (const file of files) {
    try {
      // Chequear si el archivo original existe
      try {
        await fs.access(file);
      } catch {
        console.log(`⚠️ Archivo ignorado (no encontrado): ${file}`);
        continue;
      }

      const ext = path.extname(file);
      const output = file.replace(ext, '.webp');
      
      console.log(`Convirtiendo ${file} a ${output}...`);
      await sharp(file)
        .webp({ quality: 80, effort: 6 }) // quality 80 es buen balance, effort 6 máxima compresión
        .toFile(output);
        
      console.log(`✅ Creado: ${output}`);
      
      // Mostrar comparación de tamaños
      const origStat = await fs.stat(file);
      const webpStat = await fs.stat(output);
      console.log(`   Tamaño original: ${(origStat.size / 1024).toFixed(2)} KB`);
      console.log(`   Nuevo tamaño: ${(webpStat.size / 1024).toFixed(2)} KB`);
      const ratio = (100 - (webpStat.size / origStat.size * 100)).toFixed(1);
      console.log(`   Reducción: ${ratio}%`);
      
      // Borrar el archivo original
      await fs.unlink(file);
      console.log(`🗑️ Eliminado el original: ${file}\n`);
      
    } catch (e) {
      console.error(`❌ Error procesando ${file}:`, e.message);
    }
  }
}

convert();
