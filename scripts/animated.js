const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      // Verificar si 'element' es un selector o un elemento DOM
      const node = typeof element === 'string' ? document.querySelector(element) : element;
  
      if (!node) {
        reject('Elemento no encontrado');
        return;
      }
  
      node.classList.add(`${prefix}animated`, animationName);
  
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }
  
      node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
  
  // Función para iniciar la animación de pulso
  const startPulseAnimation = async (elementSelector) => {
    while (true) {
      await animateCSS(elementSelector, 'pulse');
      await new Promise(resolve => setTimeout(resolve, 4000)); // Esperar 4 segundos antes de la siguiente animación
    }
  };
  
  // Función para iniciar la animación fadeInUp con un retraso
  const startFadeInUpAnimation = async (elementSelector, delay) => {
    await new Promise(resolve => setTimeout(resolve, delay)); // Esperar el delay antes de iniciar la animación
    await animateCSS(elementSelector, 'fadeInUp');
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    // Animación de pulso en el botón flotante
    startPulseAnimation('.float-button');
    
    // Animación fadeInUp con un delay de 200ms en elementos con clase .entrance
    startFadeInUpAnimation('.entrance', 200);


  
    // Observer para las tarjetas (.mycard)
    const cards = document.querySelectorAll('.mycard'); // Seleccionamos todos los elementos con clase 'mycard'
    const observerCards = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Elemento en pantalla:', entry.target); // Verifica si el elemento está en pantalla
          animateCSS(entry.target, 'flipInX');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // El 10% del elemento debe estar visible para que se dispare la animación
    });
  
    // Observamos cada card
    cards.forEach(card => {
      observerCards.observe(card);
    });
  
    // Observer para la clase .cta con animación fadeIn y un delay de 200ms
    const ctaElement = document.querySelector('.cta'); // Seleccionamos el elemento con clase 'cta'
    const observerCTA = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('CTA en pantalla:', entry.target); // Verifica si el CTA está en pantalla
          animateCSS(entry.target, 'fadeIn'); // Aplicar la animación fadeInUp con un delay de 200ms
          observer.unobserve(entry.target); // Dejamos de observar una vez que se ha animado
        }
      });
    }, {
      threshold: 0.04 // El 10% del elemento debe estar visible para que se dispare la animación
    });
  
    // Observar el elemento CTA
    observerCTA.observe(ctaElement);
  });
  