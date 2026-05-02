# ledgerui dev notes

```bash
bun install && bun run build
```

---

how ledgerui is built and maintained.

built with bun and vite (all typescript)

## stack

- `bun` for packages + scripts

- `typescript` for all source

- `vite` (library mode) for the js build (es + cjs)

- `vite-plugin-dts` for `.d.ts`

- `sass` (dart-sass) cli for css

- `react` / `react-dom` as peer deps

- google sans code imported in `_tokens.scss`

### current surface

- `ThemeProvider` + `useTheme`

- `Input` (`underline` | `plain` | `box`)

- tokens + reset

more components land via the "adding a component" playbook below.

## build pipeline

js and css build independently, composed in `package.json` scripts:

- `tsc --noEmit` - type check

- `vite build` - `dist/index.js`, `dist/index.cjs`, `dist/*.d.ts`. react externalized

- `sass src/styles/index.scss dist/styles.css` - css bundle

the js barrel does not import scss. consumers opt in with `import "@nategiraudeau/ledgerui/styles.css"` (same shape as `dailytracker` / `natestodos`).

## project structure

```
src/
  index.ts              barrel
  ThemeProvider.tsx     theme context + cmd+d
  useTheme.ts
  Input.tsx
  types.ts
  vite-env.d.ts         *.scss / *.css shims
  styles/
    index.scss          @use all partials
    _tokens.scss        css vars + font
    _reset.scss
    _input.scss
example/                vite app, linked via file:..
dist/                   build output (gitignored)
```

## scripts

```bash
bun run clean        # rm -rf dist
bun run build        # clean + build:js + build:css
bun run build:js     # tsc --noEmit + vite build
bun run build:css    # sass src/styles/index.scss dist/styles.css
bun run dev          # vite build --watch (js only)
bun run example
bun run example:build
```

## build output

```
dist/
  index.js           esm
  index.js.map
  index.cjs          cjs
  index.cjs.map
  index.d.ts
  ThemeProvider.d.ts
  useTheme.d.ts
  Input.d.ts
  types.d.ts
  styles.css
```

raw `src/styles/**/*.scss` ships in the package too (see `files`).

## package.json fields

- `main` / `module` / `types` / `style` / `sass` - entries

- `exports`:

    - `.` - js (types / import / require)

    - `./styles.css` - compiled css

    - `./scss` - `./src/styles/index.scss`

    - `./scss/*` - raw partials, e.g. `@nategiraudeau/ledgerui/scss/_tokens.scss`

- `files`: `dist`, `src/styles`

- `peerDependencies`: react + react-dom `^18 || ^19`

- `sideEffects`: `*.css`, `*.scss`

## adding a component

1. `src/Thing.tsx` - forwardref, className `lui-thing`

2. `src/styles/_thing.scss` - `.lui-thing` styles

3. `@use "./thing"` in `src/styles/index.scss`

4. re-export from `src/index.ts`

5. `bun run build`

6. document in `README.md`

## adding a token

1. edit `src/styles/_tokens.scss`, keep `--lui-` prefix

2. set it in light + dark blocks + the `@media (prefers-color-scheme: dark)` fallback

3. `bun run build:css`

4. document under "css variables" in `README.md`

## conventions

- double quotes (ts / tsx / scss)

- 2 space indent, semicolons

- `export default function X(...)` or `forwardRef` assigned to `const`

- no `React.` import; `jsx: react-jsx`

- class names: `lui-` prefix, kebab-case. modifiers `lui-foo--bar`

- css vars: `--lui-` prefix

- scss partials: `_foo.scss`, loaded via `@use`

## publishing

```bash
bun run build
npm publish --access public
```

before first publish:

- bump `version`

- `ls -la dist`

- `bun pm pack` to inspect the tarball

## license

mit (c) 2026 nate giraudeau
