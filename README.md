# Diya Singh — Portfolio

🌐 **Live:** https://diyasingh12.netlify.app

Personal portfolio of **Diya Singh**, Laravel Developer and aspiring DevOps Engineer.
Terminal-themed, interactive, and shipped through a CI/CD pipeline.

## Features
- 🖥️ Interactive terminal on the homepage — try `help`, `docker ps`, `kubectl get pods`, `sudo hire-diya`
- 🐳 Skills shown as Docker containers spinning up
- 🔄 Experience shown as a CI/CD pipeline
- 🏏 Cricket-style career scorecard
- ✍️ Poetry corner
- 📬 Contact form via Netlify Forms

## Tech & DevOps
- **Frontend:** React 18 + Vite
- **Hosting:** Netlify (security & cache headers in `netlify.toml`)
- **CI/CD:** GitHub Actions — builds every push & PR (`.github/workflows/ci-cd.yml`)

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content
All content lives in [`src/data/portfolio.js`](src/data/portfolio.js).
