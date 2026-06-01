import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { join } from 'path'

const client = getCliClient()

async function main() {
  console.log("Iniciando actualización de Trabajos en Sanity...")
  
  const trabajos = []
  
  const sourceItems = [
    {
      id: 1,
      title: "Aislación en techos",
      description: "Trabajo realizado en techos de chapa con espuma de poliuretano proyectado. Crea una barrera térmica impermeable, sellando puentes térmicos al instante.",
    },
    {
      id: 3,
      title: "Aislamiento acústico en paredes",
      description: "Inyección de celulosa en tabiquería. Absorbe ruidos molestos, bloquea la transferencia de sonido y funciona como una barrera térmica continua sin fisuras.",
    },
    {
      id: 4,
      title: "Reacondicionamiento de galpones",
      description: "Proyección a escala y alta velocidad. Evita la condensación y el goteo por humedad en sectores industriales y comerciales.",
    },
    {
      id: 5,
      title: "Cobertura térmica uniforme",
      description: "El sistema proyectado se adapta a cualquier morfología, adhiriéndose perfectamente a maderas, ladrillos o metales. Un proceso rápido, seguro y limpio.",
    },
    {
      id: 6,
      title: "Celulosa con protección anti-hongos y plagas",
      description: "Aislación termoacústica con propiedades higrófugas. Su tratamiento natural con sales de bórax repele roedores, insectos y previene la formación de moho.",
    }
  ]
  
  for (const item of sourceItems) {
    const video_path = `/videos/trabajo${item.id}.mp4`
    const imagePath = join(__dirname, '..', 'public', 'images', 'benefits', `trabajo${item.id}.webp`)
    
    console.log(`Subiendo miniatura para ${item.title} desde ${imagePath}...`)
    const asset = await client.assets.upload('image', createReadStream(imagePath), {
      filename: `trabajo${item.id}.webp`
    })
    
    trabajos.push({
      _key: `trabajo_realizado_${item.id}`,
      title: item.title,
      description: item.description,
      video: {
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        },
        video_path
      }
    })
  }
  
  console.log("Actualizando documento drafts.homepage...")
  
  // Patch para actualizar el bloque con _key benefits_1779584506369
  await client.patch('drafts.homepage')
    .set({
      'pageBuilder[_key=="benefits_1779584506369"]': {
        _key: "benefits_1779584506369",
        _type: "benefitsBlock",
        head: "Trabajos realizados",
        items: trabajos
      }
    })
    .commit()
    
  console.log("¡Actualización completada exitosamente!")
}

main().catch(err => {
  console.error("Error:", err)
  process.exit(1)
})
