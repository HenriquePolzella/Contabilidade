const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navLinks = [...document.querySelectorAll(".navigation a")];
const header = document.querySelector(".header");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 40 && window.innerWidth > 1080);
};

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);
updateHeader();

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const sections = [...document.querySelectorAll("main section[id]")];
const activeNavigation = () => {
  const point = window.scrollY + 180;
  let current = "inicio";
  sections.forEach((section) => {
    if (section.offsetTop <= point) current = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${current}`));
};
window.addEventListener("scroll", activeNavigation, { passive: true });
activeNavigation();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const testimonials = [...document.querySelectorAll(".testimonial")];
const dots = [...document.querySelectorAll(".slider-dots button")];
let testimonialIndex = 0;
const showTestimonial = (index) => {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === testimonialIndex));
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === testimonialIndex));
};
document.querySelector(".slider-button.prev")?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
document.querySelector(".slider-button.next")?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => showTestimonial(index)));

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
      faq.querySelector("i").textContent = "+";
    });
    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      button.querySelector("i").textContent = "−";
    }
  });
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  status.textContent = "Mensagem preparada. Conecte este formulário ao seu e-mail ou WhatsApp para receber os contatos.";
});
