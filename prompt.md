# Portfolio Design System — AI Prompt Reference

Use this file as the single source of truth when generating or modifying components for this portfolio.
Paste it (or `@prompt.md`) into Claude Code, Cursor, Copilot Chat, etc. before writing new code.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) + plain CSS custom properties |
| Animations | Framer Motion (already installed) |
| Icons | Lucide React |
| Fonts | Inter (sans), JetBrains Mono (mono) — loaded via Google Fonts in `globals.css` |

---

## Color Tokens

All colors live in `src/app/globals.css` as CSS custom properties.
**Never hard-code hex values; always reference the token.**

### Dark mode (default — `:root`)

```css
--bg-color:          #090b13;   /* page background */
--surface-color:     #0f1120;   /* card / nav background */
--surface-color-2:   #151829;   /* elevated surface */
--border-color:      #1e2235;   /* default border */
--text-primary:      #e2e8f0;
--text-secondary:    #8892a4;
--text-muted:        #4a5568;
```

### Light mode (`:root.light`)

```css
--bg-color:          #f8fafc;
--surface-color:     #ffffff;
--surface-color-2:   #f1f5f9;
--border-color:      #e2e8f0;
--text-primary:      #0f172a;
--text-secondary:    #475569;
--text-muted:        #94a3b8;
```

### Accent palette (theme-agnostic)

```
Blue    #4f72ff   (--color-accent-blue)
Purple  #8b5cf6   (--color-accent-purple)
Emerald #10b981   (--color-accent-emerald)
Cyan    #06b6d4   (--color-accent-cyan)
```

### Signature gradient

```css
/* purple → blue → cyan — used on headings & buttons */
linear-gradient(135deg, #4f72ff 0%, #8b5cf6 50%, #06b6d4 100%)
```

Tailwind class: `.gradient-text` (clips to text).

---

## Glassmorphism

Two pre-built classes — always prefer these over ad-hoc `backdrop-blur` utilities.

```css
/* Navbar / overlays */
.glass {
  background: var(--glass-bg);          /* rgba(15,17,32,0.7) dark */
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
}

/* Cards */
.glass-card {
  background: var(--glass-card-bg);     /* rgba(21,24,41,0.6) dark */
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-card-border); /* rgba(79,114,255,0.12) */
}
.glass-card:hover {
  border-color: var(--glass-card-hover-border); /* rgba(79,114,255,0.35) */
  box-shadow: 0 8px 40px var(--glass-card-glow);
  transform: translateY(-4px);
}
```

Firefox fallback (no `backdrop-filter`) is already handled in `globals.css`.

---

## "Pill" / Badge Pattern

The "Available for opportunities" badge is the canonical example.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
             glass border border-[#4f72ff]/20
             text-sm text-[#4f72ff] font-medium"
>
  <Sparkles size={14} className="animate-pulse" />
  <span>Available for opportunities</span>
</motion.div>
```

Rules:
- `rounded-full` (full pill, not `rounded-lg`)
- `glass` class for blur + tinted background
- `border border-[#4f72ff]/20` — blue at 20 % opacity
- Text colour: accent blue `#4f72ff`
- Icon: 14 px Lucide icon, often with `animate-pulse`

---

## Terminal / Code-Card Pattern

The floating `portfolio.ts` snippet in the Hero is the reference.

```tsx
<div className="glass-card rounded-2xl p-5 font-mono text-sm shadow-2xl">
  {/* macOS traffic-light dots */}
  <div className="flex items-center gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-500/70" />
    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
    <div className="w-3 h-3 rounded-full bg-green-500/70" />
    <span className="ml-2 text-text-muted text-xs">portfolio.ts</span>
  </div>

  {/* Syntax-coloured lines */}
  <p className="text-[#4f72ff]">const developer = {'{'}</p>
  <p className="text-[#10b981]">&nbsp;&nbsp;"Full-Stack Developer"</p>
  <p className="text-text-secondary">{'}'}</p>
</div>
```

Colour conventions inside the terminal:
| Token type | Colour |
|---|---|
| Keywords (`const`, `let`) | `#4f72ff` |
| Strings | `#10b981` |
| Punctuation / structure | `text-secondary` (`#8892a4` dark) |
| Filename label | `text-muted` (`#4a5568` dark) |

---

## Motion / Animation Conventions

All animated components are `"use client"`.

```tsx
// Entrance — fade + slide up (standard)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Staggered children — add delay: i * 0.1

// Hover lift (cards)
whileHover={{ y: -4 }}

// Pulse (status dots, icons)
className="animate-pulse"

// Float loop (decorative elements)
animate={{ y: [0, -16, 0] }}
transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
```

Respect `prefers-reduced-motion` — it's handled globally in `globals.css`;
Framer Motion honours it automatically via `useReducedMotion`.

---

## Buttons

```tsx
// Primary — gradient fill
<a className="btn-primary flex items-center gap-2">
  Action <ChevronRight size={16} />
</a>

// Secondary — ghost / outline
<a className="btn-secondary flex items-center gap-2">
  <Download size={16} /> Label
</a>
```

---

## Section / Layout Conventions

```tsx
<section id="section-id" className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Section label */}
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[#4f72ff] text-sm">01.</span>
      <span className="text-text-muted text-sm uppercase tracking-widest">Label</span>
    </div>
    <h2 className="section-heading gradient-text mb-12">Heading</h2>
    ...
  </div>
</section>
```

Dividers between sections:
```tsx
<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
```

---

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `.glass` / `.glass-card` | Add raw `backdrop-blur-*` utilities |
| Reference CSS vars via Tailwind `text-text-primary` | Hard-code `text-slate-200` |
| Keep `"use client"` on animated components | Use server components with Framer Motion |
| Use `rounded-full` for pill badges | Use `rounded-lg` for badges |
| Respect the 135° purple → blue → cyan gradient direction | Flip gradient or change angle |
| Add `id` attributes to interactive elements | Leave interactive elements without IDs |
