"use client";

import { GitFork, Link as LinkIcon, X as XIcon, Mail, Terminal } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/oRAcIowAA", icon: GitFork, label: "GitHub" },
  { href: "https://linkedin.com/in/oraciowaa", icon: LinkIcon, label: "LinkedIn" },
  { href: "mailto:robasowen@gmail.com", icon: Mail, label: "Email" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#1e2235]/60 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#090b13]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#4f72ff]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-[#1e2235]/60">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f72ff] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_15px_rgba(79,114,255,0.4)]">
                <Terminal size={16} className="text-white" />
              </div>
              <span className="font-mono font-semibold text-white">
                owenrobas<span className="text-[#4f72ff]">.dev</span>
              </span>
            </div>
            <p className="text-sm text-[#4a5568] leading-relaxed max-w-xs">
              Developing reliable systems and software applications. Always learning,
              always shipping.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-[#8892a4] uppercase tracking-widest mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#4a5568] hover:text-[#4f72ff] transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-semibold text-[#8892a4] uppercase tracking-widest mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#4a5568] hover:text-[#4f72ff] transition-colors w-fit"
                  >
                    <Icon size={14} />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4a5568] flex items-center gap-1.5">
            Built with{" "}
            <span className="text-[#4f72ff] font-medium">Next.js</span> &amp;{" "}
            <span className="text-[#06b6d4] font-medium">Tailwind</span> by{" "}
            <span className="text-[#8892a4] font-medium">Owen Christian T. Robas</span>
          </p>
          <p className="text-xs text-[#4a5568]">
            © {year} Owen Christian T. Robas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
