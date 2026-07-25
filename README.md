# Dear Jane — marketing website

Marketing site for **Dear Jane**, a Jane Austen companion app: Regency scandals, Austen quizzes, and Society Honours.

## Brand

Drawn from the app’s “morning letter” theme:

- Paper `#FAFAF8`
- Sealing-wax `#8B2942`
- Ink `#141210`
- Navy accent `#1E3A5F`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static output lands in `dist/`.

## Host on Cloudflare Pages (free)

The site is a static Vite build and fits the free Cloudflare Pages tier.

### 1. Create a free Cloudflare account

1. Sign up at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Verify your email

### 2. Connect this GitHub repo

1. In the Cloudflare dashboard: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorise Cloudflare for GitHub and select `francesmx/dear-jane-website`
3. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (default) |
| Node version | `22` (or set env `NODE_VERSION=22`) |

4. Save and deploy — you’ll get a `*.pages.dev` URL immediately

### 3. (Optional) Buy a domain on Cloudflare Registrar

1. **Domain registration** → search for something like `dearjane.app` / `getdearjane.com`
2. Register it (Cloudflare sells at-cost; hosting stays free)
3. In the Pages project → **Custom domains** → add the domain  
   Cloudflare will create the DNS records for you if the domain is on Cloudflare

After the custom domain is live, use that URL for App Store / Play Console privacy policy links (and redirect the old compliance page if needed).

## Privacy Policy

The full Privacy Policy lives at [`public/privacy-policy.html`](./public/privacy-policy.html) (served as `/privacy-policy.html`). It was moved here from [`dear-jane-compliance`](https://github.com/francesmx/dear-jane-compliance).

## Get the app / store links

- Every “Get the app” CTA links to `#get-the-app` (`GET_THE_APP_URL` in `src/config.ts`).
- That section shows the official App Store and Google Play badges.
- Set `APP_STORE_URL` and `PLAY_STORE_URL` in `src/config.ts` when the listings are live.
- “Buy me a coffee” uses `BUY_ME_A_COFFEE_URL` in the same file.
