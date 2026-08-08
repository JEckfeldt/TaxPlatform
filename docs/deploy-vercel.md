# Deploy / host on Vercel

Repo: [https://github.com/JEckfeldt/TaxPlatform](https://github.com/JEckfeldt/TaxPlatform)  
**Production:** [https://tax-platform-seven.vercel.app/](https://tax-platform-seven.vercel.app/)

Stack: Next.js App Router — **no environment variables** required.

## How updates work

- The production domain above tracks the latest successful **Production** deploy.
- Pushes to the Production Branch (usually `main`) rebuild automatically.
- Unique URLs like `https://tax-platform-<hash>-….vercel.app` are **one deployment only** — do not share those for the case study.

## First-time import (already done for this project)

If you need to recreate the project:

1. [vercel.com/signup](https://vercel.com/signup) — email or GitHub; Hobby plan is fine.
2. If you used email: connect GitHub from the dashboard / import screen (install the Vercel GitHub App; grant `TaxPlatform`).
3. **Add New → Project** → import **TaxPlatform**.
4. Framework preset: **Next.js**. Root `./`. No env vars.
5. **Deploy** → use the stable domain under **Settings → Domains**.

## Make the demo public

If visitors see **Log in to Vercel**, open **Settings → Deployment Protection** and turn off Vercel Authentication for **Production**. Confirm in a private window.

## Smoke-check after deploy

- Landing persona picker
- Alex → client home
- Jordan CPA → dashboard → Alex return → Messages card
- Personal filing ↔ Firm work

## Local production build

```bash
npm run build
```

## Not required

- Vercel CLI · custom domain · API keys · database · env vars
