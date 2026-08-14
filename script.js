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
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const data = new FormData(form);

  const nome = (data.get("nome") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const telefone = (data.get("telefone") || "").toString().trim();
  const servico = (data.get("servico") || "").toString().trim();
  const mensagem = (data.get("mensagem") || "").toString().trim();

  const texto =
    `Olá, RuNo! Vim pelo site.%0A%0A` +
    `*Nome:* ${nome}%0A` +
    `*E-mail:* ${email}%0A` +
    `*Telefone:* ${telefone}%0A` +
    `*Serviço:* ${servico}` +
    (mensagem ? `%0A*Mensagem:* ${mensagem}` : "");

  const url = `https://wa.me/5511985986815?text=${texto}`;

  status.textContent = "Tudo certo! Abrindo o WhatsApp com a sua mensagem…";
  window.open(url, "_blank", "noopener");
  form.reset();
});
