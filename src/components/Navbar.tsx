"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  // Prevent double-fire on touch devices — track last toggle time
  const lastToggleRef = useRef(0);

  const toggleMenu = () => {
    const now = Date.now();
    if (now - lastToggleRef.current < 300) return; // debounce 300ms
    lastToggleRef.current = now;
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setMounted(true);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["about", "projects", "experience", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click / scroll
  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [isOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.history.pushState(null, "", href);
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    // Use a plain <nav> — NOT motion.nav — so fixed positioning + z-index
    // are never affected by Framer Motion's transform compositing layer.
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-[16px] border-b border-[var(--glass-border)] shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Slide-in animation on an inner wrapper, not the fixed element */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f72ff] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_15px_rgba(79,114,255,0.4)] group-hover:shadow-[0_0_25px_rgba(79,114,255,0.6)] transition-all duration-300">
              <Terminal size={16} className="text-white" />
            </div>
            <span className="font-mono font-semibold text-text-primary">
              oc-robas<span className="text-[#4f72ff]">.dev</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#4f72ff] bg-[#4f72ff]/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right-side controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="btn-primary text-sm"
                id="nav-contact-btn"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border-color)] text-text-secondary hover:text-text-primary transition-colors duration-200"
              style={{
                background: "var(--glass-bg)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer",
                // Ensure nothing can overlap this button
                position: "relative",
                zIndex: 9999,
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-[var(--border-color)]"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors duration-200 block"
                  style={{ touchAction: "manipulation" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="btn-primary text-sm text-center mt-3 w-full justify-center"
                style={{ touchAction: "manipulation" }}
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
