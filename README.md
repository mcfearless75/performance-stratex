# Performance StratEx — Marketing Website

## Deploy to GitHub Pages

### One-time setup

1. **Create a GitHub repo** — e.g. `performance-stratex`

2. **Update `vite.config.js`** — change the base to match your repo name:
   ```js
   base: '/your-repo-name/',
   ```
   If using a custom domain, set `base: '/'`

3. **Push this folder to your repo:**
   ```bash
   cd performance-stratex
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to repo → Settings → Pages
   - Source: **GitHub Actions**
   - Save

That's it. The workflow runs automatically on every push to `main`.

---

## Local development

```bash
npm install
npm run dev
```

## Manual build

```bash
npm run build
npm run preview
```
