# YOM Groups — Website

Official website for **YOM Groups**, an SEO & content marketing agency based in New Delhi, India.

Built as a fast, modern, mobile-first **static website** (HTML + CSS + vanilla JS) — no build step, no dependencies. It can be hosted for free on **GitHub Pages**.

## 📄 Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About Us | `about.html` |
| Services (SEO + Content) | `services.html` |
| Industries | `industries.html` |
| Case Studies | `case-studies.html` |
| Blog | `blog.html` |
| Contact | `contact.html` |

## 🎨 Features

- Sticky header with mega-menu navigation + mobile hamburger menu
- Animated stat counters, scroll reveal animations, hover micro-interactions
- Services grid, industries, case studies, testimonials, FAQ accordion
- Contact form + Free SEO Audit form (front-end demo), click-to-call & WhatsApp
- SEO ready: meta tags, Open Graph, JSON-LD schema, `sitemap.xml`, `robots.txt`
- Fully responsive (desktop / tablet / mobile)

## 🚀 How to publish on GitHub Pages (free)

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select branch **`main`** (or `claude/website-building-ie3fx9`) and folder **`/ (root)`**, then **Save**.
4. After a minute your site will be live at `https://<username>.github.io/Yomgroups/`.

### Using your custom domain (yomgroups.com)

1. Add a file named `CNAME` in the repo root containing: `yomgroups.com`
2. In your domain DNS, point the domain to GitHub Pages (A records or a CNAME to `<username>.github.io`).
3. In **Settings → Pages → Custom domain**, enter `yomgroups.com` and enable **Enforce HTTPS**.

## ✏️ Things to update with your real details

- Phone number (currently placeholder `+91 11 4000 0000`) — in the top bar, footer, contact page & WhatsApp link (`wa.me/91...`).
- Full office address on the Contact page + Google Map embed.
- Social media links in the footer.
- Replace demo client logos / testimonials / case-study numbers with real ones.
- Connect the contact form to a real backend (e.g. Formspree, Google Forms, or your CRM).

## 🛠 Tech

Plain HTML5, CSS3 (custom design system in `assets/css/styles.css`), and vanilla JavaScript (`assets/js/main.js`). Google Fonts: Poppins + Inter.

---

© YOM Groups. All rights reserved.
