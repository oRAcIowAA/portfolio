import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Owen Christian T. Robas | Full-Stack Developer & IT Engineer",
  description:
    "Portfolio of Owen Christian T. Robas — a full-stack developer and IT systems administrator specializing in robust backend systems, database management, and network infrastructure.",
  keywords: [
    "Owen Christian T. Robas",
    "software engineer",
    "full-stack developer",
    "IT administrator",
    "PHP",
    "Laravel",
    "Flutter",
    "Next.js",
    "portfolio",
  ],
  openGraph: {
    title: "Owen Christian T. Robas | Full-Stack Developer",
    description: "Building reliable software systems and IT infrastructures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Viewport (CRITICAL for mobile responsiveness) ── */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Theme color for browser chrome on Android/iOS */}
        <meta name="theme-color" content="#090b13" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
