export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request);
    }

    if (url.pathname === "/health") {
      return new Response("ok", { status: 200 });
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request) {
  try {
    const data = await request.json();
    const { name = "", email = "", message = "" } = data;

    if (!email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Contact submission:", { name, email, message });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
