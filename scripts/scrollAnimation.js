document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.fadeInUp');
  
    const observerOptions = {
      root: null, // Observa la viewport
      threshold: 0.1 // Activa cuando el 10% del elemento está visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated'); // Añade la clase cuando entra en pantalla
          observer.unobserve(entry.target); // Deja de observar después de que se activa
        }
      });
    }, observerOptions);
  
    animatedElements.forEach(element => {
      observer.observe(element); // Comienza a observar cada elemento
    });
  });
  