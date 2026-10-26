// Nav background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// FAQ: close other items when one opens
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-item[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Contact form
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector(".submit-btn");
  const original = btn.innerHTML;
  const data = Object.fromEntries(new FormData(form).entries());

  btn.disabled = true;
  btn.textContent = "Sending…";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Request failed");
    btn.textContent = "✓ Message sent";
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
    }, 3000);
  } catch {
    btn.textContent = "Failed — email hello@witbitlabs.com";
    btn.disabled = false;
  }
});
