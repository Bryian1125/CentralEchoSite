# Error Report — central_echo_site

Audit date: October 3, 2026

## Check status

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | **FAIL** — 1 error, 12 warnings (exit code 1) |
| Typecheck | `npx tsc --noEmit` | PASS — clean |
| Build | `npm run build` | PASS — Next.js 16.3.2 (Turbopack) |

```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /categories/[slug]
```

Only `/` and `/categories/[slug]` exist. This matters for finding #1.

Suspicious Tailwind classes below were verified against the real compiled output in
`.next/static/chunks/0do0skc1s9lra.css` rather than assumed. Several candidates were
checked and found **correct**, so they are not listed as errors:

- `font-[Hefring_Slab_Bold]` (unquoted) generates identical valid CSS to the quoted form.
- `z-2`, `z-3`, `z-5` are valid bare numeric z-index utilities in Tailwind v4.
- `w-4xl`, `h-90`, `h-13`, `h-30`, `h-32`, `w-32`, `border-1`, `inset-x-75`,
  `rounded-4xl`, `md:h-360`, `md:w-256` all generate rules correctly.

---

## Real errors

### 1. Dead navigation links — `components/Navbar.tsx:68-72`

This is the single lint **error**. The mobile menu links to four routes that do not
exist, so all of them 404.

```jsx
<a href="/" className="...">Home</a>          // error: use <Link />
<a href="/opinion" ...>Opinion</a>            // 404
<a href="/feature" ...>Feature</a>            // 404
<a href="/literary" ...>Literary</a>          // 404
<a href="/sports" ...>Sports</a>              // 404
```

The real category pages live under `/categories/[slug]`, which is what
`components/Home/DisplayHeader.tsx:13` already links to correctly. These should be
`/categories/opinion`, `/categories/feature`, `/categories/literary`,
`/categories/sports`, and `Home` should use `<Link>` from `next/link`.

### 2. Malformed Tailwind arbitrary property — `components/Navbar.tsx:44`

Missing closing `]`, so Tailwind silently discards the declaration.

```
[mask-repeat:no-repeat"      <-- no closing bracket
```

Verified: only 6 mask rules were emitted and this one is absent from the output. The
element still receives `mask-image` and `mask-size`, but without `mask-repeat` the
header logo image can tile. The other three mask usages (lines 41, 51, 56) are correct.

### 3. Navbar scroll logic is broken — `components/Navbar.tsx:19-23`

Both branches of the conditional do the same thing, so the navbar never reappears on
scroll-up.

```js
if (latest < 10) {
    setVisible(true);
} else if (latest > lastScrollY.current) {
    setVisible(false);
} else {
    setVisible(false);        // identical to the branch above
}
```

The `else` branch was presumably meant to call `setVisible(true)`. As written the
`lastScrollY` ref at line 10 has no effect on behaviour.

### 4. Invalid Tailwind classes that silently no-op

Each of these was confirmed absent from the compiled CSS, so they render as if the class
were never written.

| File | Line | Class | Notes |
|---|---|---|---|
| `components/Home/LiteraryDisplay.tsx` | 15 | `md:items-align` | No such utility |
| `components/Home/HeroBanner.tsx` | 32 | `md:h-xl` | No such utility |
| `components/Home/SmallDisplayCard.tsx` | 16 | `text-md` | No such step in the scale |
| `components/Home/LiteraryDisplayCard.tsx` | 16 | `text-md` | No such step in the scale |

### 5. `<img>` elements with no `src` — 4 places

These render broken images.

- `components/Home/SmallDisplayCard.tsx:10`
- `components/Home/LargeDisplayCard.tsx:10`
- `components/Home/LiteraryDisplayCard.tsx:10`
- `components/Home/CarouselCard.tsx:11`

They are also the entire source of the 12 lint warnings: 6× `@next/next/no-img-element`
and 6× `jsx-a11y/alt-text`. Note that the image at `CarouselCard.tsx:31` and
`DisplayHeader.tsx:18` *does* have a `src` and is only missing `alt`.

### 6. Duplicate Tailwind import — `app/globals.css`

`@import "tailwindcss";` appears twice, at line 1 and line 36. The build dedupes it so
the emitted CSS is unaffected, but it is redundant source.

### 7. Typo in theme token — `app/globals.css:40`

```
--font-hefring-mediun: 'Hefring Slab Medium', serif;   <-- "mediun"
```

Should be `--font-hefring-medium`.

### 8. Font family name mismatch — `app/globals.css:42`

```css
--font-neuehaas: "Neue Haas Grotesk", sans-serif;
```

But the `@font-face` block at line 31 declares the family as `'NeueHaasGrotDisp'`. The
token references a family that is never registered, so it would fall back to
`sans-serif`. Currently latent because nothing references the token — all components use
the arbitrary value `font-['NeueHaasGrotDisp']` instead.

### 9. Body font override defeats the design system — `app/globals.css:56`

```css
body { font-family: Arial, Helvetica, sans-serif; }
```

This overrides `--font-sans` (Geist, wired up in `app/layout.tsx:6-14`). Any text without
an explicit font class renders in Arial rather than the intended typeface.

### 10. Dead empty file — `app/homePage.tsx`

0 bytes. Nothing imports it.

### 11. Multi-line string props render stray whitespace — `components/Home/HeroBanner.tsx`

The `title` props at lines 36-37, 43-44 and 50-51 are multi-line JSX string literals.
The embedded newlines and indentation collapse into visible whitespace in the rendered
title. The third card (lines 50-51) already uses the correct single-line form.

---

## Minor

- **`components/Home/DisplayHeader.tsx:13-20`** — `<Link>` wraps a `<button>`. Interactive
  content nested inside an anchor is invalid HTML and an accessibility problem.
- **`components/Home/CarouselCard.tsx:10`** — `aspect-video` (16:9) sits alongside a fixed
  `w-[720px] h-[480px]` (3:2). Because both dimensions are set, the aspect class has no
  effect.
- **`app/categories/[slug]/page.tsx`** — no slug validation, so any arbitrary string renders
  a page (e.g. `/categories/typo`) with a "CATEGORY ARCHIVES" header.