# ledgerui example

```bash
bun install && bun run dev
```

---

tiny vite app that imports `ledgerui` locally. used as a playground while building out the library.

built with bun and vite (all typescript)

## quick start

from the repo root:

```bash
bun run example
```

or directly from this folder:

```bash
cd example
bun install
bun run dev
```

then open:

```txt
http://localhost:5173
```

## what looks like (for ppl who are blind and can't see)

- one page, centered column

- theme controls at top (light / dark / system / toggle)

- the `<Input />` component rendered in both variants (underline + plain)

- hitting `cmd + d` (or `ctrl + d`) flips the theme

## how linked to the lib

the example is a separate bun project with a file link in its `package.json`:

```json
"dependencies": {
  "ledgerui": "file:..",
  ...
}
```

so `import { Input } from "ledgerui"` resolves up one level to the library. `bun install` inside `example/` sets up the symlink.

the example imports the compiled css:

```ts
import "ledgerui/styles.css";
```

so you need to build the lib first (`bun run build` from the repo root) before the css import resolves. after that, `bun run dev` in the example picks up lib js changes directly via the symlink, but css changes require re-running `bun run build:css` at the root.

## files

- `src/main.tsx` - react entrypoint, wraps the app in `<ThemeProvider>`

- `src/App.tsx` - the demo page itself

- `src/styles.scss` - example-only layout styles (uses `--lui-*` tokens from the lib)

- `vite.config.ts` - just `@vitejs/plugin-react-swc`

- `index.html` - static shell

## license

mit (c) 2026 nate giraudeau
