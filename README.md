# ledgerui

```bash
bun add ledgerui
```

---

minimal react + scss ui kit

just the bare framework: palette, font, reset, theme toggle, and a starter input. more components get added as needed.

built with bun and vite (all typescript)

## quick start

### install

```bash
bun add ledgerui
```

peer deps:

- react `^18` or `^19`

- react-dom `^18` or `^19`

### use

```tsx
import { ThemeProvider, Input, useTheme } from "ledgerui";
import "ledgerui/styles.css";

function App() {
  const { theme, toggle } = useTheme();
  return (
    <main>
      <div>theme: {theme}</div>
      <button type="button" onClick={toggle}>toggle</button>
      <Input placeholder="type something" />
    </main>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

### use scss source instead of built css

if you want to override tokens or cherry-pick partials, import the scss sources directly:

```scss
@use "ledgerui/scss/tokens";
@use "ledgerui/scss/reset";
@use "ledgerui/scss/input";
```

or pull everything:

```scss
@use "ledgerui/scss";
```

## what looks like (for ppl who are blind and can't see)

- monospace text (google sans code, loaded by the library)

- solarized palette

    - light bg `#fdf6e3`, fg `#586e75`

    - dark bg `#002b36`, fg `#93a1a1`

    - accent `#2aa198` (solarized cyan)

- design is minimal (transparent backgrounds, borderless inputs, thin underlines)

- light or dark driven by system

    (cmd + d to override, stored in localStorage)

## whats in the box

- `ThemeProvider` / `useTheme` - data-theme attr on `:root`, cmd+d toggle, system default, localStorage persistence

- `Input` - borderless underline input (and a `plain` variant)

- `styles.css` - compiled bundle (fonts, palette, reset, all component styles)

- `scss/*` - raw scss partials if you want to compose your own bundle

### css variables

all tokens are css vars prefixed `--lui-`. override them on `:root` (or any parent) to theme:

- `--lui-bg`, `--lui-fg`, `--lui-muted`, `--lui-line`

- `--lui-stroke`, `--lui-fill`, `--lui-accent`, `--lui-on`

- `--lui-hover-bg`, `--lui-focus-ring`, `--lui-drag-shadow`

- `--lui-font-mono`

- `--lui-radius-sharp`, `--lui-radius-round`

## theme api

```tsx
import { ThemeProvider, useTheme } from "ledgerui";

<ThemeProvider
  defaultPreference="system"   // "light" | "dark" | "system"
  storageKey="ledgerui-theme"  // localStorage key
  toggleKey="d"                // cmd/ctrl + {key} toggles
>
  {children}
</ThemeProvider>
```

`useTheme()` returns:

- `theme` - resolved theme: `"light" | "dark"`

- `preference` - user preference: `"light" | "dark" | "system"`

- `setPreference(next)` - set preference explicitly

- `toggle()` - flip light/dark (sets an explicit preference)

## what its built with

- `react` `^19` (peer dep, also supports `^18`)

- `typescript`

- `scss` (dart-sass)

- `vite` in library mode (es + cjs)

- `vite-plugin-dts` for `.d.ts`

## project structure

```
src/
  index.ts              barrel export
  ThemeProvider.tsx     theme context + keyboard toggle
  useTheme.ts           hook
  Input.tsx             <Input /> component
  types.ts              shared types
  styles/
    index.scss          entry (used all)
    _tokens.scss        css vars, font import
    _reset.scss         box-sizing + body defaults
    _input.scss         .lui-input styles
example/                tiny vite app using the lib via file: link
```

## build + dev

```bash
bun install
bun run build          # outputs dist/index.js, dist/index.cjs, dist/index.d.ts, dist/styles.css
bun run dev            # vite build --watch
bun run example        # runs the example vite app
```

## license

mit (c) 2026 nate giraudeau
