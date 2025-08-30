// ================== CONFIGURAÇÃO DO SITE ==================
document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const themeLight = document.getElementById('theme-light');
  const themeDark = document.getElementById('theme-dark');
  const themeAuto = document.getElementById('theme-auto');

  // ================== TEMA ==================
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    body.classList.remove('light-theme', 'dark-theme');
    if(theme==='dark') body.classList.add('dark-theme');
    else body.classList.add('light-theme');
  }

  function setThemeFromSystem() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    if(savedTheme==='auto') {
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
    } else {
      applyTheme(savedTheme);
    }
  }

  // Aplica tema inicial
  setThemeFromSystem();

  // Escuta mudanças do sistema em tempo real
  mediaQuery.addEventListener('change', e => {
    const savedTheme = localStorage.getItem('theme');
    if(!savedTheme || savedTheme==='auto') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Botões de tema
  themeLight.addEventListener('click', () => localStorage.setItem('theme','light') || setThemeFromSystem());
  themeDark.addEventListener('click', () => localStorage.setItem('theme','dark') || setThemeFromSystem());
  themeAuto.addEventListener('click', () => localStorage.setItem('theme','auto') || setThemeFromSystem());

  // ================== ÍCONES LUCIDE ==================
  window.lucide?.createIcons();

  // ================== HOVER “CARREGAMENTO” ==================
  document.querySelectorAll("button, .btn, .btn-section, input, textarea, .nav-links li a")
    .forEach(el => {
      el.addEventListener("mouseenter", () => el.classList.add("hover-loading"));
      el.addEventListener("mouseleave", () => el.classList.remove("hover-loading"));
    });

  // ================== PULSAÇÃO SUAVE ==================
  const pulseElements = [
    document.querySelector('h1.logo'),
    document.querySelector('.user-name'),
    document.querySelector('.user-role'),
    ...document.querySelectorAll('h2')
  ].filter(Boolean);

  pulseElements.forEach(el => {
    el.style.transition = "opacity 1.5s ease-in-out";
    let visible = true;
    setInterval(() => {
      visible = !visible;
      el.style.opacity = visible ? "1" : "0.6";
    }, 1500);
  });

  // ================== ANIMAÇÃO DE PERCENTUAIS ==================
  document.querySelectorAll(".skill-circle").forEach(circle => {
    const percent = parseInt(circle.dataset.percent);
    const progressCircle = circle.querySelector(".progress");
    const percentText = circle.querySelector(".percent");
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    let currentPercent = 0;
    const animate = () => {
      if(currentPercent < percent){
        currentPercent++;
        percentText.textContent = `${currentPercent}%`;
        progressCircle.style.strokeDashoffset = circumference - (currentPercent / 100) * circumference;
        requestAnimationFrame(animate);
      }
    };
    animate();
  });

  // ================== ANIMAÇÃO AO ROLAR ==================
  const animatedSections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.2 });
  animatedSections.forEach(sec => observer.observe(sec));

  // ================== CONTADOR ANIMADO ==================
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            if(count < target){
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });
  counterObserver.observe(document.querySelector('.quick-stats'));

  // ================== SCROLL SUAVE ==================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ================== MENU HAMBÚRGUER ==================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks?.classList.toggle("show");
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.classList.remove("active");
    });
  });

});
