# Portfolio safety checklist

## Before merging or deploying

Run:

```bash
npm run check
```

This verifies referenced local assets, supported routes, the sitemap, private-page indexing protection, Cloudflare SPA routing, the health endpoint, TypeScript, and the production bundle. GitHub Actions runs the same command for pushes and pull requests to `dev` and `main`.

Use the `dev` deployment for visual review before merging into `main`. Check at least the homepage, Somapay PF, Crédito do Trabalhador, both languages, and one unknown URL for the 404 page.

## Uptime monitoring

Monitor this lightweight endpoint every five minutes:

```text
https://arielcavalcante.com/health.json
```

A healthy response is HTTP `200` with `"status": "ok"`. A free uptime service such as UptimeRobot or Better Stack can alert when it fails from outside Cloudflare.

The health endpoint confirms that the deployment and domain respond. It does not replace the CI build checks or a quick visual review.

## If production breaks

1. Open Cloudflare Pages → the portfolio project → Deployments.
2. Roll back to the most recent known-good production deployment.
3. Confirm `/health.json`, `/`, `/somapay-pf`, and `/br/somapay-pf` respond.
4. Fix the issue on `dev`, run `npm run check`, and review the preview deployment before promoting it again.

Do not delete or rename a public file that has already been shared. Keep its old URL working with a redirect or a compatibility copy, especially PDFs and R2-hosted files.

## Broken-link response

- For local images, fonts, videos, and PDFs, the integrity test reports the missing path and the source file that references it.
- For a first-party public URL, restore the previous path first, then update the site separately.
- For third-party links such as LinkedIn, WhatsApp, or YouTube, verify them manually when their destination changes; automated CI checks against these services are intentionally avoided because they frequently reject bots.
