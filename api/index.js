const db = require("./db.json");

// Helper
function json(res, status, data) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(status).json(data);
}

module.exports = (req, res) => {
  if (req.method === "OPTIONS") return res.status(200).end();

  const { url, method } = req;
  const path = url.replace(/\?.*$/, "");

  // GET /api/health
  if (path === "/api/health") {
    return json(res, 200, { status: "ok", timestamp: new Date().toISOString() });
  }

  // GET /api/profile
  if (path === "/api/profile" && method === "GET") {
    return json(res, 200, { success: true, data: db.profile });
  }

  // GET /api/skills
  if (path === "/api/skills" && method === "GET") {
    const grouped = req.query?.grouped === "true";
    if (grouped) {
      const g = db.skills.reduce((acc, s) => {
        (acc[s.category] = acc[s.category] || []).push(s);
        return acc;
      }, {});
      return json(res, 200, { success: true, data: g });
    }
    return json(res, 200, { success: true, data: db.skills });
  }

  // GET /api/projects
  if (path === "/api/projects" && method === "GET") {
    let projects = db.projects;
    const q = new URLSearchParams(url.split("?")[1] || "");
    if (q.get("category")) {
      projects = projects.filter(
        (p) => p.category.toLowerCase() === q.get("category").toLowerCase()
      );
    }
    if (q.get("featured") === "true") {
      projects = projects.filter((p) => p.featured);
    }
    return json(res, 200, { success: true, data: projects });
  }

  // GET /api/projects/:id
  const projMatch = path.match(/^\/api\/projects\/(.+)$/);
  if (projMatch && method === "GET") {
    const project = db.projects.find((p) => p.id === projMatch[1]);
    if (!project)
      return json(res, 404, { success: false, error: "Project not found" });
    return json(res, 200, { success: true, data: project });
  }

  // POST /api/contact
  if (path === "/api/contact" && method === "POST") {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return json(res, 400, {
        success: false,
        error: "Name, email, and message are required.",
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(res, 400, { success: false, error: "Invalid email address." });
    }
    // In production, wire this to SendGrid / Resend / Nodemailer
    console.log(`📬 Contact from ${name} <${email}>: ${message}`);
    return json(res, 201, {
      success: true,
      message: "Message received! I'll get back to you soon.",
    });
  }

  return json(res, 404, { success: false, error: "Not found" });
};
