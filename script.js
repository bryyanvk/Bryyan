// ================== CONFIGURAÇÃO DO SITE ==================
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark-theme"); // Força tema escuro
  if (window.lucide) lucide.createIcons(); // Ativa ícones Lucide

  // ================== HOVER “CARREGAMENTO” ==================
  document.querySelectorAll("button, .btn, .btn-section, input, textarea, .nav-links li a").forEach(el => {
    el.addEventListener("mouseenter", () => {
      el.classList.add("hover-loading");
    });
    el.addEventListener("mouseleave", () => {
      el.classList.remove("hover-loading");
    });
  });

  // ================== ANIMAÇÃO DE PERCENTUAIS ==================
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

      if (currentPercent >= percent) clearInterval(animation);
    }, 20);
  });
});

// ================== MENU HAMBÚRGUER ==================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // Animação do hambúrguer
  navLinks.classList.toggle("show");   // Abre/fecha menu mobile
});
