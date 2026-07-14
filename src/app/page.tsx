import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import GitHubProjects from "@/components/GitHubProjects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Skeleton fallback while GitHub API fetches on server
function ProjectsSkeleton() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[#4f72ff] text-sm">02.</span>
          <div className="h-4 w-32 bg-[#1e2235] rounded animate-pulse" />
        </div>
        <div className="h-10 w-64 bg-[#1e2235] rounded animate-pulse mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 h-64 animate-pulse"
            >
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1e2235]" />
                <div className="flex-1">
                  <div className="h-4 bg-[#1e2235] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#1e2235] rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-[#1e2235] rounded w-full" />
                <div className="h-3 bg-[#1e2235] rounded w-5/6" />
                <div className="h-3 bg-[#1e2235] rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090b13] text-[#e2e8f0]">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1e2235] to-transparent" />

      {/* About */}
      <About />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1e2235] to-transparent" />

      {/* GitHub Projects — fetched server-side, Suspense for streaming */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <GitHubProjects />
      </Suspense>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1e2235] to-transparent" />

      {/* Experience Timeline */}
      <Experience />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1e2235] to-transparent" />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
