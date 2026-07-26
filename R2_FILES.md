# R2 file hosting

Files under `/files/*` are served by the Pages Function in
`functions/files/[[path]].ts` from the `ariel-portfolio-files` R2 bucket.

## Cloudflare binding

The `FILES_BUCKET` production and preview binding is configured in the root
`wrangler.toml`. It points to `ariel-portfolio-files`, so the repository remains
the source of truth for future Pages deployments.

## No-downtime migration

Keep a file in `public/files` until the same object key has been uploaded to R2.
An existing static file takes precedence over the catch-all Function route.

For example, upload:

```sh
npx wrangler r2 object put ariel-portfolio-files/arielcavalcante-resume-cloudwalk.pdf \
  --file public/files/arielcavalcante-resume-cloudwalk.pdf \
  --content-type application/pdf \
  --remote
```

After confirming the object exists in R2:

1. Remove the matching copy from `public/files`.
2. Redeploy the Pages project.
3. Verify the original public URL with both a `HEAD` request and a download.

Do not change the object key after sharing its `/files/<key>` URL.
