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

## Privacy Policy

The full Privacy Policy lives at [`public/privacy-policy.html`](./public/privacy-policy.html) (served as `/privacy-policy.html`). It was moved here from [`dear-jane-compliance`](https://github.com/francesmx/dear-jane-compliance).

## Get the app / store links

- Every “Get the app” CTA links to `#get-the-app` (`GET_THE_APP_URL` in `src/config.ts`).
- That section shows the official App Store and Google Play badges.
- Set `APP_STORE_URL` and `PLAY_STORE_URL` in `src/config.ts` when the listings are live.
- “Buy me a coffee” uses `BUY_ME_A_COFFEE_URL` in the same file.
