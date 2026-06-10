# Personal Portfolio — Full-Stack

A complete personal portfolio with a **vanilla HTML/CSS/JS frontend** and a **Node.js serverless backend** (Vercel-ready). Zero build step required.

---

## 🗂 Project structure

```
portfolio/
├── public/
│   └── index.html        ← Full self-contained frontend
├── api/
│   ├── index.js          ← Serverless API handler (all routes)
│   └── db.json           ← Data store (projects, skills, profile)
├── vercel.json           ← Vercel routing config
└── package.json
```

---

## 🚀 Deploy to Vercel (5 minutes)

### Option A — Vercel CLI
```bash
npm i -g vercel
cd portfolio
vercel          # follow prompts → done
vercel --prod   # promote to production
```

### Option B — GitHub + Vercel dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Leave all settings as default → **Deploy**

That's it. Vercel auto-detects `vercel.json`.

---

## 💻 Local development

```bash
npm i -g vercel
vercel dev
# → http://localhost:3000
```

---

## ✏️ Customise your content

All personal data lives in **`api/db.json`**. Edit these sections:

### Profile (`db.json → profile`)
```json
{
  "name": "Your Name",
  "title": "Your Role",
  "tagline": "Your one-liner",
  "bio": "Paragraph 1.\n\nParagraph 2.",
  "email": "you@example.com",
  "github": "https://github.com/yourhandle",
  "linkedin": "https://linkedin.com/in/yourhandle",
  "location": "Your City, Country",
  "available": true
}
```

### Projects (`db.json → projects`)
Add/edit project objects:
```json
{
  "id": "7",
  "title": "My New Project",
  "description": "What it does.",
  "tags": ["React", "Node.js"],
  "category": "Full Stack",
  "year": 2025,
  "liveUrl": "https://yourproject.com",
  "githubUrl": "https://github.com/you/project",
  "featured": true
}
```

### Skills (`db.json → skills`)
```json
{ "name": "Rust", "level": 70, "category": "Languages" }
```

---

## 📧 Wire up real email (contact form)

In `api/index.js`, find the `POST /api/contact` handler and replace the `console.log` with your email provider:

### Resend (recommended, free tier)
```bash
npm install resend
```
```js
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'portfolio@yourdomain.com',
  to: 'you@example.com',
  subject: `New message from ${name}`,
  text: message,
  replyTo: email,
});
```
Add `RESEND_API_KEY` in Vercel → Settings → Environment Variables.

---

## 🗄 Upgrade to a real database

The JSON file works perfectly for a personal portfolio. When you're ready for a real DB:

### MongoDB Atlas (free)
```bash
npm install mongoose
```
Replace `readDB()` calls in `api/index.js` with Mongoose queries.
Add `MONGODB_URI` as a Vercel environment variable.

### PostgreSQL (Vercel Postgres)
Vercel offers a managed Postgres — add it in the Vercel dashboard under Storage.

---

## 🎨 Customise the design

Design tokens are CSS variables at the top of `public/index.html`:
```css
:root {
  --acc: #5B5EFF;      /* accent colour */
  --ink: #0D0F1A;      /* background */
  --text: #E8EAF2;     /* body text */
  ...
}
```

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Profile data |
| GET | `/api/skills` | Skills list |
| GET | `/api/projects` | All projects |
| GET | `/api/projects?category=Backend` | Filtered projects |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/contact` | Send contact message |
