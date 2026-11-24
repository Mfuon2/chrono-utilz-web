# ChronoUtilz documentation

Documentation, generated API reference and a single JavaScript/TypeScript playground for [ChronoUtilz](https://github.com/Mfuon2/chrono-utilz).

```bash
npm ci
npm run build
npm test
```

The committed `src/generated` snapshot pins the exact library release used by documentation and the playground. To update it, run the library's `npm run check`, then set `CHRONO_SOURCE` to that checkout and run `npm run sync:library`. Commit the generated bundle, API manifest, examples and release integrity metadata together. CI rejects mismatched versions or bundle hashes. It checks all published examples in Chromium, Firefox and WebKit.

`npm run dev` starts local development. Netlify uses `netlify.toml`, including client-side route fallback. The single playground is `/playground`; old category/demo routes redirect to the reference or playground. Code runs in a fresh worker inside an opaque-origin sandbox with a restrictive content security policy. Static package imports and TypeScript are transformed locally. Network requests are blocked. The parent page enforces cancellation and a two-second timeout.

TypeScript execution transpiles syntax; it does not run the TypeScript type checker. Library types are checked in the package release pipeline. No pasted code is sent to an execution service.
