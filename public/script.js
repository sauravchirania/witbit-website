document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector("button");
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
    btn.textContent = "✓ Message sent!";
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Send message";
    }, 3000);
  } catch {
    btn.textContent = "Something went wrong — please email us";
    btn.disabled = false;
  }
});
