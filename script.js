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
    if (theme === 'dark') body.classList.add('dark-theme');
    else body.classList.add('light-theme');
  }

  function setThemeFromSystem() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    if (savedTheme === 'auto') {
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
    } else {
      applyTheme(savedTheme);
    }
  }

  setThemeFromSystem();

  mediaQuery.addEventListener('change', e => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'auto') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  themeLight.addEventListener('click', () => {
    localStorage.setItem('theme', 'light');
    setThemeFromSystem();
  });
  themeDark.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark');
    setThemeFromSystem();
  });
  themeAuto.addEventListener('click', () => {
    localStorage.setItem('theme', 'auto');
    setThemeFromSystem();
  });

  // ================== ÍCONES LUCIDE ==================
  window.lucide?.createIcons();

  // ================== BOTÃO EXIBIR MAIS / MENOS ==================
const showMoreBtn = document.getElementById("show-more-btn");
const showLessBtn = document.getElementById("show-less-btn");
const hiddenCards = document.querySelectorAll(".hidden-card");

// Inicialmente esconde os cards extras
hiddenCards.forEach(card => {
  card.style.display = "none";
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.4s ease";
});

// Exibir mais
showMoreBtn?.addEventListener("click", () => {
  hiddenCards.forEach((card, index) => {
    card.style.display = "block";
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
  showMoreBtn.style.display = "none";
  showLessBtn.style.display = "inline-block";
});

// Exibir menos
showLessBtn?.addEventListener("click", () => {
  hiddenCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 0;
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 400); // depois da transição
    }, index * 100);
  });
  showLessBtn.style.display = "none";
  showMoreBtn.style.display = "inline-block";
});


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
      if (currentPercent < percent) {
        currentPercent++;
        percentText.textContent = `${currentPercent}%`;
        progressCircle.style.strokeDashoffset =
          circumference - (currentPercent / 100) * circumference;
        requestAnimationFrame(animate);
      }
    };
    animate();
  });

  // ================== ANIMAÇÃO AO ROLAR ==================
  const animatedSections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.2 });
  animatedSections.forEach(sec => observer.observe(sec));

  // ================== CONTADOR ANIMADO ==================
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            if (count < target) {
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
  const quickStats = document.querySelector('.quick-stats');
  if (quickStats) counterObserver.observe(quickStats);

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

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");
      });
    });
  }

  // ================== HOVER EM BOTÕES DE HABILIDADES ==================
  document.querySelectorAll(".habilidades button")
    .forEach(el => {
      el.addEventListener("mouseenter", () => el.classList.add("hover-loading"));
      el.addEventListener("mouseleave", () => el.classList.remove("hover-loading"));
    });

  // ================== REVELAR AO ROLAR ==================
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ================== FILTRAR PROJETOS ==================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".projeto-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === "all") {
          card.style.display = "block";
        } else if (filter === "favorite") {
          card.style.display = card.classList.contains("favorited") ? "block" : "none";
        } else {
          card.style.display = card.dataset.category === filter ? "block" : "none";
        }
      });
    });
  });

  // ================== FAVORITOS COM LOCALSTORAGE ==================
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favSection = document.querySelector(".favoritos-grid");

  function updateFavoritesUI() {
    projectCards.forEach(card => {
      const id = card.dataset.id;
      if (favorites.includes(id)) {
        card.classList.add("favorited");
      } else {
        card.classList.remove("favorited");
      }
    });

    // Atualiza seção Favoritos
    if (favSection) {
      favSection.innerHTML = "";
      favorites.forEach(id => {
        const card = document.querySelector(`.projeto-card[data-id="${id}"]`);
        if (card) favSection.appendChild(card.cloneNode(true));
      });
    }
  }

  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".projeto-card");
      const id = card.dataset.id;

      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        card.classList.remove("favorited");
      } else {
        favorites.push(id);
        card.classList.add("favorited");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    });
  });
// ================== PARTICULAS NOS CARDS ==================
const cards = document.querySelectorAll('.projeto-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    for (let i = 0; i < 15; i++) { // mais partículas
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // posição aleatória dentro do card (x e y)
      particle.style.left = Math.random() * card.offsetWidth + 'px';
      particle.style.top = Math.random() * card.offsetHeight + 'px';
      
      // escala aleatória
      const size = Math.random() * 6 + 3; // entre 3px e 9px
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      // animação aleatória
      const duration = Math.random() * 1 + 0.5; // 0.5s a 1.5s
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = Math.random() * 0.3 + 's';

      card.appendChild(particle);
      
      // remove a partícula depois da animação
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  });
});


  updateFavoritesUI();

});
