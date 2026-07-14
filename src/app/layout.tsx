import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "oRAcIowAA | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of oRAcIowAA — a software engineer specializing in backend architecture, full-stack development, and scalable systems. Explore my projects and experience.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "backend",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    title: "oRAcIowAA | Software Engineer",
    description: "Building robust systems and scalable software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
