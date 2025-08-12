// ================== CONFIGURAÇÃO DO SITE FIXO EM TEMA ESCURO ================== //
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark-theme"); // Força tema escuro em todas as páginas
  if (window.lucide) lucide.createIcons(); // Ativa ícones Lucide
});

// ================== EFEITO HOVER COM CARREGAMENTO EM BOTÕES/INPUTS ================== //
document.querySelectorAll("button, .btn, .btn-section, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("hover-loading"); // Classe CSS para animação de carregamento
  });
  el.addEventListener("mouseleave", () => {
    el.classList.remove("hover-loading");
  });
});

// ================== ANIMAÇÃO DE PERCENTUAIS NAS HABILIDADES ================== //
document.addEventListener("DOMContentLoaded", () => {
  const skillCircles = document.querySelectorAll(".skill-circle");
  
  skillCircles.forEach(circle => {
    const percent = circle.getAttribute("data-percent");
    const progressCircle = circle.querySelector(".progress");
    const percentText = circle.querySelector(".percent");
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    let currentPercent = 0;
    const animation = setInterval(() => {
      currentPercent++;
      percentText.textContent = `${currentPercent}%`;
      const offset = circumference - (currentPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;

      if (currentPercent >= percent) {
        clearInterval(animation);
      }
    }, 20);
  });
});
