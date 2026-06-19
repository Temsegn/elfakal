# Elfakal PLC — Corporate Website

Ethiopia's trusted industrial supply & import partner. A premium B2B marketing website for **Elfakal PLC**, supplier of agricultural and coffee equipment, fragrances & flavors, cosmetics & soaps, library and archival supplies, furniture, and shade nets.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Features

- Responsive landing page with image-rich hero
- Pages: Home, About, Products, Services, Projects, Industries, Contact
- Expandable product & service cards ("View More")
- AI-style chat assistant ("Elfa") with quick replies + free text
- Interactive Google Map location
- SEO metadata, Open Graph tags, and keyword optimization

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

This project is a standard Next.js app and deploys to Vercel with zero configuration.

### Option A — Git (recommended)

1. Push this repository to GitHub / GitLab / Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel auto-detects Next.js — keep defaults and click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production deployment
```

No environment variables are required. All images are served locally from `public/images`.

## Project Structure

```
src/
├── app/                # App Router pages
│   ├── about/
│   ├── products/
│   ├── services/
│   ├── projects/
│   ├── industries/
│   ├── contact/
│   ├── layout.tsx
│   └── page.tsx        # Home
├── components/
│   ├── layout/         # Navbar, Footer, ChatBot
│   ├── sections/       # Home page sections
│   └── ui/             # Reusable UI (cards, headings, map)
└── lib/                # Constants & chatbot knowledge base
public/images/          # All site imagery
```
