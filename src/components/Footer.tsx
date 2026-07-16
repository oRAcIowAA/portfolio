"use client";

import { GitFork, Link as LinkIcon, Mail, Terminal } from "lucide-react";

const FacebookIcon = (props: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={props.size ?? 14}
    height={props.size ?? 14}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const socialLinks = [
  { href: "https://www.facebook.com/oc.robas", icon: FacebookIcon, label: "Facebook" },
  { href: "https://github.com/oRAcIowAA", icon: GitFork, label: "GitHub" },
  { href: "https://linkedin.com/in/oraciowaa", icon: LinkIcon, label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=robasowen@gmail.com&su=Inquiry%20from%20Portfolio&body=Hi%20Owen,%0D%0A%0D%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding...", icon: Mail, label: "Email" },
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
    <footer className="relative border-t border-border/60 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#4f72ff]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-border/60">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f72ff] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_15px_rgba(79,114,255,0.4)]">
                <Terminal size={16} className="text-white" />
              </div>
              <span className="font-mono font-semibold text-text-primary">
                owenrobas<span className="text-[#4f72ff]">.dev</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Developing reliable software systems and IT infrastructures. Always learning,
              always shipping.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-[#4f72ff] transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
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
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-[#4f72ff] transition-colors w-fit"
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
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            Built with{" "}
            <span className="text-[#4f72ff] font-medium">Next.js</span> &amp;{" "}
            <span className="text-[#06b6d4] font-medium">Tailwind</span> by{" "}
            <span className="text-text-secondary font-medium">Owen Christian T. Robas</span>
          </p>
          <p className="text-xs text-text-muted">
            © {year} Owen Christian T. Robas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
