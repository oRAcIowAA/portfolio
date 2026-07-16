"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Link as LinkIcon,
  Send,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  GitFork,
} from "lucide-react";

const FacebookIcon = (props: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={props.size ?? 18}
    height={props.size ?? 18}
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
  {
    label: "Facebook",
    href: "https://www.facebook.com/oc.robas",
    icon: FacebookIcon,
    color: "#1877f2",
    hoverColor: "hover:text-[#1877f2]",
  },
  {
    label: "GitHub",
    href: "https://github.com/oRAcIowAA",
    icon: GitFork,
    color: "#e2e8f0",
    hoverColor: "hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/owen-christian-robas-0159b2297/",
    icon: LinkIcon,
    color: "#4f72ff",
    hoverColor: "hover:text-[#4f72ff]",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=robasowen@gmail.com&su=Inquiry%20from%20Portfolio&body=Hi%20Owen,%0D%0A%0D%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding...",
    icon: Mail,
    color: "#10b981",
    hoverColor: "hover:text-[#10b981]",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-background" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4f72ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-[#4f72ff] text-sm">04.</span>
          <span className="text-sm font-medium text-text-muted uppercase tracking-widest">
            Contact
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-text-primary mb-4"
        >
          Let&apos;s <span className="gradient-text">Work Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-secondary max-w-xl mb-14"
        >
          Whether you have a project in mind, a job opportunity, or just want to
          say hi — my inbox is always open. I&apos;ll get back to you as soon
          as possible!
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4f72ff]/10 flex items-center justify-center text-[#4f72ff] flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1">Email</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=robasowen@gmail.com&su=Inquiry%20from%20Portfolio&body=Hi%20Owen,%0D%0A%0D%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-[#4f72ff] transition-colors font-medium"
                >
                  robasowen@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1">Location</p>
                <p className="text-text-primary font-medium">Bagumbayan Sur, Naga City, PH</p>
                <p className="text-xs text-text-muted mt-0.5">Open to local and remote opportunities</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1">Phone</p>
                <a
                  href="tel:+639102972392"
                  className="text-text-primary hover:text-[#f59e0b] transition-colors font-medium"
                >
                  0910-297-2392
                </a>
                <p className="text-xs text-text-muted mt-0.5">Available for calls and messages</p>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-4">
                Find me on
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      id={`social-${social.label.toLowerCase().replace("/", "-")}`}
                      title={social.label}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all hover:scale-110"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-lg font-bold text-text-primary mb-6">
                Send a Message
              </h3>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-[#10b981]" />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-text-muted">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="btn-secondary text-sm mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-[#4f72ff]/50 focus:ring-1 focus:ring-[#4f72ff]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="robasowen@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-[#4f72ff]/50 focus:ring-1 focus:ring-[#4f72ff]/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-[#4f72ff]/50 focus:ring-1 focus:ring-[#4f72ff]/30 transition-all resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
                      <AlertCircle size={16} />
                      <span>Failed to send. Please email me directly.</span>
                    </div>
                  )}

                  {/* Warning disclaimer banner */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-500 leading-relaxed">
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Notice:</strong> This form is for visual presentation only and is not connected to any external database or API due to spam prevention and resource costs. If you want to send a message, please email me directly using the contact details.
                    </span>
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
