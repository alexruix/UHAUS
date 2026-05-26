import React from 'react'

export const SEOPreview = ({ document }: { document: any }) => {
  const { displayed } = document
  
  if (!displayed) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        No hay datos para mostrar.
      </div>
    )
  }

  const title = displayed.meta_title || displayed.title || 'Título de tu sitio'
  const description = displayed.description || 'Aquí aparecerá la descripción de tu sitio web. Es importante para que los usuarios sepan de qué trata tu página antes de entrar.'
  const url = 'https://tu-sitio.com'

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
      <div 
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          fontFamily: 'arial, sans-serif'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#333' }}>
            Previsualización en Google (Resultados de Búsqueda)
          </h2>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Así es como se vería tu página en los resultados de búsqueda de Google.
          </p>
        </div>

        {/* Google Result Card */}
        <div style={{ 
          marginTop: '20px',
          wordWrap: 'break-word'
        }}>
          {/* URL & Favicon */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ 
              width: '28px', 
              height: '28px', 
              backgroundColor: '#eee', 
              borderRadius: '50%',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              🌐
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#202124', lineHeight: '1.2' }}>Tu Empresa</div>
              <div style={{ fontSize: '12px', color: '#4d5156', lineHeight: '1.2' }}>{url}</div>
            </div>
          </div>
          
          {/* Title */}
          <div style={{ 
            color: '#1a0dab', 
            fontSize: '20px', 
            lineHeight: '1.3', 
            cursor: 'pointer',
            marginBottom: '4px'
          }}>
            <span style={{ textDecoration: 'none' }}>
              {title}
            </span>
          </div>
          
          {/* Description */}
          <div style={{ 
            color: '#4d5156', 
            fontSize: '14px', 
            lineHeight: '1.58' 
          }}>
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
