// Premium Animation Engine for UHAUS
document.addEventListener("astro:page-load", () => {
  // 1. Reveal on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach((el, index) => {
    if (!el.dataset.delay && el.parentElement.classList.contains('stagger-container')) {
      el.dataset.delay = (index % 4) * 150;
    }
    revealObserver.observe(el);
  });

  const pulseElements = document.querySelectorAll('.pulse-premium');
  pulseElements.forEach(el => {
    el.style.animation = "pulse-premium 3s infinite ease-in-out";
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes pulse-premium {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(120, 194, 71, 0.4); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(120, 194, 71, 0); }
  }
`;
document.head.appendChild(style);