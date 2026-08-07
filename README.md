# Dear Jane - marketing website

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
cp .env.example .env
# Set VITE_POSTHOG_PROJECT_TOKEN in .env (same token as the Dear Jane app is fine)
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static output lands in `dist/` (landing page, support, and privacy policy).

## Analytics (PostHog)

The site uses PostHog (EU) with a cookie consent banner:

- Events are tagged `surface=website` so they stay filterable from app analytics in the same project.
- Until the visitor accepts or declines, no cookies are set and no events are sent (`cookieless_mode: on_reject`).
- Accept enables first-party analytics cookies; decline keeps cookieless aggregate measurement.
- Local development and preview (`npm run dev`, `localhost`, `127.0.0.1`, `*.local`) never initialize PostHog or show the cookie banner.

Set these environment variables locally and in Cloudflare Pages:

| Variable                     | Required | Notes                                  |
| ---------------------------- | -------- | -------------------------------------- |
| `VITE_POSTHOG_PROJECT_TOKEN` | Yes      | Project API key from PostHog           |
| `VITE_POSTHOG_HOST`          | No       | Defaults to `https://eu.i.posthog.com` |

## Host on Cloudflare Pages (free)

The site is a static Vite build and fits the free Cloudflare Pages tier.

### 1. Create a free Cloudflare account

1. Sign up at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Verify your email

### 2. Connect this GitHub repo

1. In the Cloudflare dashboard: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorise Cloudflare for GitHub and select `francesmx/dear-jane-website`
3. Use these build settings:

| Setting                | Value                               |
| ---------------------- | ----------------------------------- |
| Framework preset       | Vite (or None)                      |
| Build command          | `npm run build`                     |
| Build output directory | `dist`                              |
| Root directory         | `/` (default)                       |
| Node version           | `22` (or set env `NODE_VERSION=22`) |

4. Under **Environment variables**, add `VITE_POSTHOG_PROJECT_TOKEN` (and optionally `VITE_POSTHOG_HOST`) for Production
5. Save and deploy - you’ll get a `*.pages.dev` URL immediately

### 3. (Optional) Buy a domain on Cloudflare Registrar

1. **Domain registration** → search for something like `dearjane.app` / `getdearjane.com`
2. Register it (Cloudflare sells at-cost; hosting stays free)
3. In the Pages project → **Custom domains** → add the domain  
   Cloudflare will create the DNS records for you if the domain is on Cloudflare

After the custom domain is live, use that URL for App Store / Play Console privacy policy links (and redirect the old compliance page if needed).

## Privacy Policy

The full Privacy Policy lives at [`privacy-policy.html`](./privacy-policy.html) (served as `/privacy-policy.html`). It covers the app and website (on-device progress, PostHog analytics and website cookies, Sentry diagnostics/session replay, optional feedback).

## Support URL (App Store / Play)

The App Store support page lives at [`support.html`](./support.html) (served as `/support.html`). Use `https://dearjaneapp.co.uk/support.html` (or your custom domain equivalent) as the Support URL in store listings. Contact email is assembled in JavaScript so it is not a plain `mailto:` in the HTML source.

## Get the app / store links

- Every “Get the app” CTA links to `#get-the-app` (`GET_THE_APP_URL` in `src/config.ts`).
- That section shows the official App Store and Google Play badges.
- Set `APP_STORE_URL` and `PLAY_STORE_URL` in `src/config.ts` when the listings are live.
- “Buy me a coffee” uses `BUY_ME_A_COFFEE_URL` in the same file.
