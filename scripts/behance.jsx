import React, { useState } from 'react';
import { 
  Thermometer, 
  Wind, 
  Leaf, 
  Code, 
  Layout, 
  Zap, 
  CheckCircle, 
  Smartphone, 
  Cpu, 
  Globe,
  Sparkles,
  Send,
  Loader2,
  X,
  Layers,
  MousePointer2,
  BarChart3,
  Search,
  Box
} from 'lucide-react';

const apiKey = "";

const App = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Implementación de la API de Gemini
  const callGemini = async (prompt, retries = 0) => {
    setIsLoading(true);
    setAiResponse('');
    
    const systemPrompt = "Eres un Senior UI Engineer experto. Analizas el proyecto UHAUS. El stack es Astro, React, Tailwind y GSAP. El Design System usa el color primario #008148 y fuentes Inter/Heebo. Responde de forma técnica, profesional y humana en español.";
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Contexto: ${systemPrompt}\n\nPregunta: ${prompt}` }] }]
        })
      });

      if (!response.ok) {
        if (response.status === 429 && retries < 5) {
          const delay = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return callGemini(prompt, retries + 1);
        }
        throw new Error('Error en la comunicación');
      }

      const data = await response.json();
      setAiResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "Respuesta no disponible.");
    } catch (error) {
      setAiResponse("Error al conectar con el motor de IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedAction = (actionType) => {
    let prompt = "";
    switch (actionType) {
      case 'design':
        prompt = "Explica la lógica del Design System de UHAUS basado en el código (#008148) y su relación con la sostenibilidad industrial.";
        break;
      case 'astro':
        prompt = "Describe por qué la arquitectura de islas de Astro fue la mejor decisión para el SEO y rendimiento de UHAUS.";
        break;
      case 'gsap':
        prompt = "Analiza el impacto de las animaciones GSAP en la experiencia del usuario para este caso de estudio.";
        break;
      default:
        prompt = userInput;
    }
    callGemini(prompt);
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans selection:bg-[#008148]/10">
      
      {/* SECCIÓN HERO - Narrativa Visual */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[#ffffff]">
        <div className="absolute top-10 left-10 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#008148] rounded-lg flex items-center justify-center text-white italic font-bold">U</div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#131313]">U HAUS / INGENIERÍA UI</p>
          </div>
        </div>
        
        <div className="z-10 text-center max-w-5xl">
          <div className="inline-block px-4 py-1 border border-[#008148]/20 rounded-full text-[#008148] bg-[#008148]/5 mb-8 text-xs font-bold tracking-widest uppercase">
            Rendimiento y Sostenibilidad
          </div>
          <h1 className="text-6xl md:text-[9rem] font-bold text-[#131313] leading-[0.85] mb-8 tracking-tighter font-secondary">
            UHAUS <br/>
            <span className="text-[#008148] font-light italic">Ecosistema Térmico</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#333333] max-w-2xl mx-auto leading-relaxed font-light">
            Sinterización de ingeniería de materiales y software para una experiencia digital de alta eficiencia.
          </p>
        </div>

        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#008148 1px, transparent 1px), linear-gradient(90deg, #008148 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </section>

      {/* EL PROCESO: ARQUITECTURA TÉCNICA */}
      <section className="py-32 px-6 bg-[#131313] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#008148] font-bold tracking-[0.3em] uppercase text-xs mb-6">Proceso de Ingeniería</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 font-secondary">La ventaja de Astro</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              El reto no era solo visual; era de rendimiento. Implementé la **Arquitectura de Islas de Astro** para garantizar que el contenido crítico se sirviera como HTML estático, reduciendo el peso del JavaScript y optimizando el SEO para un mercado industrial competitivo.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Zap size={24} className="text-[#008148] mb-4" />
                <h4 className="font-bold mb-2">Zero-JS por Defecto</h4>
                <p className="text-xs text-slate-500">Velocidad de carga instantánea mediante generación estática.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Box size={24} className="text-[#008148] mb-4" />
                <h4 className="font-bold mb-2">Hidratación Parcial</h4>
                <p className="text-xs text-slate-500">Interacción dinámica solo donde el usuario la necesita.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#008148]/10 rounded-3xl p-8 border border-[#008148]/20 font-mono text-sm text-[#008148]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="mb-2">// Análisis de Componente Atómico</p>
              <p className="pl-4 text-white">---</p>
              <p className="pl-4 text-white">const {'{ title, text }'} = Astro.props;</p>
              <p className="pl-4 text-white">---</p>
              <p className="mt-4">{'<section class="reveal-on-scroll">'}</p>
              <p className="pl-4">{'<h2 class="font-secondary">{title}</h2>'}</p>
              <p className="pl-4">{'<p>{text}</p>'}</p>
              <p>{'</section>'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN SYSTEM: TOKENS DE IDENTIDAD */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-[#008148] font-bold tracking-[0.3em] uppercase text-xs mb-4">Sistema de Diseño</h2>
          <h3 className="text-5xl font-bold font-secondary">Tokens de Identidad Visual</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Paleta de Colores */}
          <div className="space-y-8">
            <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#008148] rounded-full"></div>
              Colores Base
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-[#008148] rounded-2xl shadow-lg"></div>
                <p className="text-[10px] font-mono font-bold">#008148</p>
                <p className="text-[10px] uppercase text-slate-400">Verde Primario</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-[#131313] rounded-2xl shadow-lg"></div>
                <p className="text-[10px] font-mono font-bold">#131313</p>
                <p className="text-[10px] uppercase text-slate-400">Gris Profundo</p>
              </div>
            </div>
          </div>

          {/* Tipografía */}
          <div className="space-y-8 md:col-span-2">
            <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#008148] rounded-full"></div>
              Tipografía
            </h4>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-slate-50 rounded-3xl">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Principal (Inter)</p>
                <p className="text-4xl font-bold mb-4">Aa Bb Cc</p>
                <p className="text-sm leading-relaxed text-slate-500 italic">
                  Legibilidad absoluta para datos técnicos y navegación fluida.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Impacto (Heebo)</p>
                <p className="text-4xl font-bold font-secondary mb-4 tracking-tighter">Heebo Heavy</p>
                <p className="text-sm leading-relaxed text-slate-500 italic">
                  Solidez visual para titulares que comunican autoridad en aislación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA ATÓMICA */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[#008148] font-bold tracking-[0.3em] uppercase text-xs mb-4">Arquitectura de Componentes</h2>
            <h3 className="text-4xl font-bold font-secondary">Modularidad Atómica</h3>
            <p className="text-slate-500 mt-4 max-w-2xl">
              Basado en la estructura del repositorio, el proyecto se divide en componentes atómicos que facilitan la escalabilidad y el mantenimiento del código.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow">
               <Layers className="text-[#008148] mb-4" />
               <h4 className="font-bold text-xs uppercase tracking-widest">Layouts</h4>
               <p className="text-[10px] text-slate-400 mt-2">Base.astro y Default.astro</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow">
               <Code className="text-[#008148] mb-4" />
               <h4 className="font-bold text-xs uppercase tracking-widest">Componentes</h4>
               <p className="text-[10px] text-slate-400 mt-2">Hero, Logo, About_us</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow">
               <Search className="text-[#008148] mb-4" />
               <h4 className="font-bold text-xs uppercase tracking-widest">SEO Semántico</h4>
               <p className="text-[10px] text-slate-400 mt-2">Optimización de etiquetas HTML5</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow">
               <MousePointer2 className="text-[#008148] mb-4" />
               <h4 className="font-bold text-xs uppercase tracking-widest">Interactividad</h4>
               <p className="text-[10px] text-slate-400 mt-2">React Slider y GSAP</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADO FINAL: PRODUCTO Y EXPERIENCIA */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden group">
           <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex gap-2">
                 <div className="w-3 h-3 bg-[#008148]/20 rounded-full"></div>
                 <div className="w-3 h-3 bg-[#008148]/20 rounded-full"></div>
                 <div className="w-3 h-3 bg-[#008148]/20 rounded-full"></div>
              </div>
              <div className="text-[10px] font-mono text-slate-400">uhaus.com.ar/proceso</div>
           </div>
           
           <div className="p-12 md:p-20 bg-white min-h-[500px] flex flex-col gap-16">
              <nav className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 bg-[#008148] rounded-xl flex items-center justify-center text-white italic font-bold">U</div>
                   <span className="font-bold text-2xl tracking-tighter uppercase font-secondary">U Haus</span>
                </div>
                <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <span className="text-[#008148] border-b-2 border-[#008148] pb-1">Ingeniería</span>
                  <span>Beneficios</span>
                  <span>Materiales</span>
                </div>
                <button className="bg-[#131313] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Consultar
                </button>
              </nav>

              <div className="grid md:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <h4 className="text-7xl font-bold leading-[0.9] tracking-tighter font-secondary uppercase">
                       AISLA <br/> PROTEGE <br/> <span className="text-[#008148]">AHORRA</span>
                    </h4>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
                       La celulosa Pro es el material más ecológico y resistente. Implementamos tecnología avanzada para reducir el consumo energético.
                    </p>
                    <div className="flex gap-6">
                       <div className="flex flex-col gap-1">
                          <span className="text-3xl font-bold">5°C</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Diferencial</span>
                       </div>
                       <div className="w-px h-12 bg-slate-200"></div>
                       <div className="flex flex-col gap-1">
                          <span className="text-3xl font-bold">40%</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Eficiencia</span>
                       </div>
                    </div>
                 </div>
                 <div className="relative h-96 bg-slate-100 rounded-[3rem] overflow-hidden flex items-center justify-center">
                    <Wind size={200} className="text-[#008148]/10 animate-float" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ASISTENTE DE IA: ANÁLISIS TÉCNICO */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isAiOpen ? 'w-[400px]' : 'w-16'}`}>
        {!isAiOpen ? (
          <button 
            onClick={() => setIsAiOpen(true)}
            className="w-16 h-16 bg-[#008148] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all"
          >
            <Sparkles />
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-[#eeeeee] overflow-hidden flex flex-col h-[550px]">
            <div className="p-4 bg-[#131313] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#008148]" />
                <span className="font-bold text-xs uppercase tracking-widest">Asistente de Ingeniería</span>
              </div>
              <button onClick={() => setIsAiOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 text-sm">
              {aiResponse ? (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-[#333333] leading-relaxed">
                    {aiResponse}
                  </div>
                  <button onClick={() => setAiResponse('')} className="text-[10px] uppercase font-bold text-[#008148]">
                    Nueva consulta
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Análisis del Proceso</p>
                  <div className="grid grid-cols-1 gap-3">
                    <button onClick={() => handlePredefinedAction('design')} className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-[#008148] transition-all text-slate-600">
                      ¿Cómo escala el Design System?
                    </button>
                    <button onClick={() => handlePredefinedAction('astro')} className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-[#008148] transition-all text-slate-600">
                      Lógica de las Islas de Astro
                    </button>
                    <button onClick={() => handlePredefinedAction('gsap')} className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-[#008148] transition-all text-slate-600">
                      Optimización con GSAP
                    </button>
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <Loader2 className="animate-spin text-[#008148]" size={32} />
                  <p className="text-[10px] font-bold text-[#008148] animate-pulse">Analizando código...</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ej: ¿Por qué elegiste Heebo?"
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-slate-50 border-none text-xs focus:ring-2 focus:ring-[#008148]"
                />
                <button 
                  onClick={() => handlePredefinedAction('custom')}
                  disabled={!userInput || isLoading}
                  className="absolute right-2 top-2 p-1.5 bg-[#008148] text-white rounded-xl"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="py-24 px-6 text-center bg-[#131313] text-white">
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#008148] mb-6">Síntesis</h2>
        <h3 className="text-4xl font-bold mb-12 font-secondary tracking-tighter uppercase italic">Engineering Comfort</h3>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-16 leading-relaxed font-light">
          UHAUS es el resultado de una orquestación precisa entre la ingeniería de materiales y el desarrollo de software. Al optimizar cada milisegundo de carga y cada interacción, no solo entregué una web, sino una herramienta que refleja la misma eficiencia que la celulosa provee a un hogar.
        </p>
        <div className="mt-20 text-[10px] text-slate-700 uppercase font-bold tracking-widest">
           © 2024 Alex UI Engineering • Argentina
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Heebo:wght@400;700;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .font-secondary {
          font-family: 'Heebo', sans-serif;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default App;