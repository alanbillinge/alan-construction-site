"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Hammer,
  Wrench,
  Shield,
  Mail,
  Phone,
  MapPin,
  Home,
  ArrowUpCircle,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Simple multi-page brochure site for Alan Billinge Construction
// Home / Services / Projects / Credentials / Contact
// Uses shadcn UI components + lucide-react icons

const PAGES = ["home", "services", "projects", "credentials", "contact"] as const;
type Page = (typeof PAGES)[number];

function useHashRoute(defaultPage: Page = "home") {
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === "undefined") return defaultPage;
    const hash = window.location.hash.replace("#", "").toLowerCase();
    return PAGES.includes(hash as Page) ? (hash as Page) : defaultPage;
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (PAGES.includes(hash as Page)) setPage(hash as Page);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (p: Page) => {
    if (typeof window !== "undefined" && p !== page) {
      window.location.hash = p;
    }
  };

  return { page, navigate };
}

// --- IMAGES (construction-specific) ---
const photos = {
  home: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop", // cranes
  services: "/services-hero.jpg", // Save your uploaded services image as public/services-hero.jpg
  projects:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop", // rc frame
  credentials:
    "https://images.unsplash.com/photo-1591712611838-c9e68b0a0f63?q=80&w=1600&auto=format&fit=crop", // site works
  contact:
    "https://images.unsplash.com/photo-1590650153854-13b7c1f3e5f3?q=80&w=1600&auto=format&fit=crop", // team coordination
};

// --- SERVICES ---
const services = [
  {
    icon: Wrench,
    title: "Engineering & Setting Out",
    text: "Permanent and temporary works setting out, drainage setting out, as‑built surveys, QA management, and monitoring. Ensuring precision, compliance, and traceability across all stages of construction.",
  },
  {
    icon: Hammer,
    title: "Construction Management",
    text: "End-to-end site leadership: programmes, logistics, quality, cost, and handover.",
  },
  {
    icon: ArrowUpCircle,
    title: "Lifting Operations",
    text: "All aspects of lifting — from static rigging works through to the erection and dismantle of tower cranes. Appointed Person (CPCS A61), Crane Supervision, and full compliance with BS7121. Experienced with complex lifts, confined spaces, and coordination across multiple trades.",
  },
  {
    icon: Truck, // MEWP-related visual stand‑in
    title: "MEWP Coordination",
    text: "Comprehensive management of MEWP operations including IPAF MEWP for Managers, coordination of access and egress plans, preparation of MEWP-specific RAMS, rescue plans, and site compliance assurance. Ensuring safety, efficiency, and adherence to manufacturer and HSE standards.",
  },
  {
    icon: Wrench,
    title: "Temporary Works",
    text: "BS5975-compliant TWC oversight. Extensive experience in formwork, falsework, and both above- and below-ground systems such as trench boxes, piling works, needling, and propping. Excellent relationships with designers and suppliers including MGF, Mabey Hire, Hunnebeck, and Groundforce.",
  },
  {
    icon: Shield,
    title: "H&S & Compliance",
    text: "SMSTS, LOLER/PUWER, CDM. Robust RAMS, toolbox talks, audits, and close calls.",
  },
];

const projects = [
  {
    name: "Manchester Engineering Campus Development",
    role: "Logistics & Lifting Coordination",
    summary:
      "Heavy lifts, MCWP, complex sequencing, and stakeholder liaison across live campus.",
  },
  {
    name: "Royal Liverpool University Hospital",
    role: "Temporary Works / RC Interfaces",
    summary:
      "Structural toppings, drainage coordination, and high-spec healthcare compliance.",
  },
  {
    name: "Weststone Construction Projects",
    role: "Concrete Frame & Fit-out Interfaces",
    summary:
      "Tight programmes, tower crane logistics, quality assurance and handover readiness.",
  },
];

// --- DEV RUNTIME CHECKS (lightweight test cases) ---
function runDevChecks() {
  if (typeof console === "undefined") return;

  // Core structure tests
  console.assert(Array.isArray(services), "services should be an array");
  console.assert(services.length === 5, "services should have 5 entries");

  console.assert(Array.isArray(projects), "projects should be an array");
  console.assert(projects.length === 3, "projects should have 3 entries");

  console.assert(typeof photos.home === "string" && photos.home.length > 0, "photos.home set");

  // Extra sanity tests
  console.assert(PAGES.includes("home" as Page), "PAGES should include 'home'");
  console.assert(typeof photos.services === "string" && photos.services.length > 0, "photos.services set");
}

function Hero({ title, subtitle, img }: { title: string; subtitle: string; img: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h1>
          <p className="mt-5 text-neutral-600 md:text-lg">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Based in Preston
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <img
            src={img}
            alt="Hero"
            className="aspect-[4/3] w-full object-cover rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero
        title="Delivering Safe, On‑Programme Builds in the North West"
        subtitle="We are an experienced Construction Management team with extensive experience across civil engineering, structural works, and high‑profile developments. We have managed prestigious projects across the North West and nationwide, providing leadership in logistics, lifting operations, and temporary works. Collaborative and compliance‑driven, we have successfully delivered schemes for principal contractors such as Willmott Dixon, Sisk, BAE Systems, CRUK, and Murphys, as well as working with Weststone Construction on challenging urban builds."
        img={photos.home}
      />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <Hero
        title="Services"
        subtitle="Practical management tailored to live, complex environments."
        img={photos.services}
      />
      <section className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Icon className="h-5 w-5" /> {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 whitespace-pre-line">{text}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> RAMS / TBTs / Permits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Programme & Sequencing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Quality & Handover
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <Hero
        title="Selected Projects"
        subtitle="A snapshot of complex, large‑scale work."
        img={photos.projects}
      />
      <section className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.name} className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{p.role}</p>
                  <p className="mt-2 text-sm text-neutral-600">{p.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CredentialsPage() {
  const logoItems = [
    { name: "CSCS", src: "/logos/cscs.png" },
    { name: "CITB", src: "/logos/citb.png" },
    { name: "NOCN", src: "/logos/nocn.png" },
    { name: "IPAF", src: "/logos/ipaf.png" },
  ];

  return (
    <>
      <Hero
        title="Credentials"
        subtitle="Competency, compliance, and proven delivery backed by nationally recognised schemes."
        img={photos.credentials}
      />
      <section className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 space-y-10">
          <div className="rounded-3xl bg-neutral-900 text-white p-8 md:p-10 shadow-lg">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4">Core Qualifications &amp; Tickets</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <strong>CSCS Level 6</strong> – Construction Management
              </li>
              <li>
                <strong>SMSTS</strong> – Site Management Safety Training Scheme
              </li>
              <li>
                <strong>CPCS A61 / A62 / A40a</strong> – Appointed Person, Crane Supervisor, Slinger Signaller
              </li>
              <li>
                <strong>IPAF 3A / 3B / 1B</strong> – MEWP Operation
              </li>
              <li>
                <strong>IPAF MEWP for Managers</strong> – planning and supervising MEWP activities
              </li>
              <li>
                <strong>Temporary Works Coordinator</strong> – BS5975 compliant
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Recognised Training &amp; Certification Bodies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center">
              {logoItems.map((logo) => (
                <div
                  key={logo.name}
                  className="flex flex-col items-center justify-center rounded-2xl border bg-neutral-50 px-4 py-3 shadow-sm"
                >
                  <div className="h-10 flex items-center justify-center mb-2">
                    <img
                      src={logo.src}
                      alt={`${logo.name} logo`}
                      className="max-h-10 max-w-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-neutral-700">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              Add logo files to <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">/public/logos/</code>{" "}
              as <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">cscs.png</code>,{" "}
              <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">citb.png</code>,{" "}
              <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">nocn.png</code>,{" "}
              and <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">ipaf.png</code> to display the badges.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Hero
        title="Contact"
        subtitle="Tell us about your project and timescales."
        img={photos.contact}
      />
      <section className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Email" type="email" />
                  </div>
                  <Input placeholder="Company / Project" />
                  <Textarea placeholder="Scope, dates, site constraints…" rows={5} />
                  <Button type="button">Submit</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" /> alan_billinge@yahoo.co.uk
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" /> 07497 572 504
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" /> Preston
              </div>
              <p className="text-neutral-600">
                Available for short‑ and long‑term engagements, CIS or PAYE.
              </p>
              <div className="pt-2">
                <p className="font-medium">Business Hours</p>
                <p className="text-neutral-600">Mon–Fri · 08:00–17:00 (flexible for site needs)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Website() {
  const { page, navigate } = useHashRoute("home");

  // Run lightweight dev checks to mimic basic test cases at runtime
  if (process.env.NODE_ENV !== "production") {
    runDevChecks();
  }

  const PageComponent = useMemo(() => {
    switch (page) {
      case "services":
        return ServicesPage;
      case "projects":
        return ProjectsPage;
      case "credentials":
        return CredentialsPage;
      case "contact":
        return ContactPage;
      case "home":
      default:
        return HomePage;
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-neutral-900 flex items-center justify-center text-white font-bold">
              AB
            </div>
            <div>
              <p className="text-sm leading-tight text-neutral-600">Alan Billinge</p>
              <p className="text-sm font-semibold">Construction Manager & Appointed Person</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#home"
              onClick={() => navigate("home")}
              className="hover:opacity-70 flex items-center gap-1"
            >
              <Home className="h-4 w-4" /> Home
            </a>
            <a
              href="#services"
              onClick={() => navigate("services")}
              className="hover:opacity-70"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={() => navigate("projects")}
              className="hover:opacity-70"
            >
              Projects
            </a>
            <a
              href="#credentials"
              onClick={() => navigate("credentials")}
              className="hover:opacity-70"
            >
              Credentials
            </a>
            <a
              href="#contact"
              onClick={() => navigate("contact")}
              className="hover:opacity-70"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <PageComponent />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Alan Billinge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-70">
              Privacy
            </a>
            <a href="#" className="hover:opacity-70">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
