const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
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
      await new Promise(resolve => setTimeout(resolve, 4000)); 
    }
  };
  
  const startFadeInUpAnimation = async (elementSelector, delay) => {
    await new Promise(resolve => setTimeout(resolve, delay)); 
    await animateCSS(elementSelector, 'fadeInUp');
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    // Animación de pulso en el botón flotante
    startPulseAnimation('.float-button');
    
    // Animación fadeInUp con un delay de 200ms en elementos con clase .entrance
    startFadeInUpAnimation('.entrance', 200);

    
    const cards = document.querySelectorAll('.mycard'); 
    const observerCards = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Elemento en pantalla:', entry.target); 
          animateCSS(entry.target, 'flipInX');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 
    });
  
   
    cards.forEach(card => {
      observerCards.observe(card);
    });
  
    
    const ctaElement = document.querySelector('.cta'); 
    const observerCTA = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('CTA en pantalla:', entry.target);
          animateCSS(entry.target, 'fadeIn'); 
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.04 
    });
  
    
    observerCTA.observe(ctaElement);
  });
  