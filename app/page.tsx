"use client";

import {
  CheckCircle,
  Hammer,
  Wrench,
  Shield,
  Mail,
  Phone,
  MapPin,
  Home as HomeIcon,
  ArrowUpCircle,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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
  services: "https://images.unsplash.com/photo-1581091215367-59ab6c1d3d5b?q=80&w=1600&auto=format&fit=crop", // formwork
  projects: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop", // rc frame
  credentials: "https://images.unsplash.com/photo-1591712611838-c9e68b0a0f63?q=80&w=1600&auto=format&fit=crop", // site works
  contact: "https://images.unsplash.com/photo-1590650153854-13b7c1f3e5f3?q=80&w=1600&auto=format&fit=crop", // team coordination
};

// --- SERVICES ---
const services = [
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
    icon: Truck, // MEWP-related visual stand-in
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
    summary: "Heavy lifts, MCWP, complex sequencing, and stakeholder liaison across live campus.",
  },
  {
    name: "Royal Liverpool University Hospital",
    role: "Temporary Works / RC Interfaces",
    summary: "Structural toppings, drainage coordination, and high-spec healthcare compliance.",
  },
  {
    name: "Weststone Construction Projects",
    role: "Concrete Frame & Fit-out Interfaces",
    summary: "Tight programmes, tower crane logistics, quality assurance and handover readiness.",
  },
];

// --- RUNTIME SMOKE TESTS ---
function runSmokeTests() {
  const tests: { name: string; pass: boolean }[] = [];

  const iconsOk = [
    CheckCircle,
    Hammer,
    Wrench,
    Shield,
    Mail,
    Phone,
    MapPin,
    HomeIcon,
    ArrowUpCircle,
    Truck,
  ].every((Icon) => typeof Icon === "function");
  tests.push({ name: "lucide-react icons resolved", pass: iconsOk });

  tests.push({ name: "services count = 5", pass: Array.isArray(services) && services.length === 5 });
  tests.push({ name: "projects count = 3", pass: Array.isArray(projects) && projects.length === 3 });

  const photosOk = Object.values(photos).every((u) => typeof u === "string" && u.startsWith("http"));
  tests.push({ name: "page photos valid", pass: photosOk });

  return tests;
}

function TestPanel() {
  const tests = runSmokeTests();
  const allPass = tests.every((t) => t.pass);
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div className="rounded-2xl border bg-white shadow-sm p-4">
        <h2 className="text-base font-semibold mb-2">Runtime Smoke Tests</h2>
        <ul className="space-y-2 text-sm">
          {tests.map((t) => (
            <li key={t.name} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-xs ${
                  t.pass ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
              >
                {t.pass ? "✓" : "✗"}
              </span>
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-3 text-xs ${allPass ? "text-green-700" : "text-red-700"}`}>
          {allPass ? "All smoke tests passed." : "Some tests failed — review data or imports."}
        </p>
      </div>
    </div>
  );
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
          <img src={img} alt="Hero" className="aspect-[4/3] w-full object-cover rounded-3xl shadow-xl" />
        </motion.div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero
        title="Delivering Safe, On-Programme Builds in the North West"
        subtitle="We are an experienced Construction Management team with extensive experience across civil engineering, structural works, and high-profile developments. We have managed prestigious projects across the North West and nationwide, providing leadership in logistics, lifting operations, and temporary works. Collaborative and compliance-driven, we have successfully delivered schemes for principal contractors such as Willmott Dixon, Sisk, BAE Systems, CRUK, and Murphys, as well as working with Weststone Construction on challenging urban builds."
        img={photos.home}
      />
      <TestPanel />
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
              <div key={title} className="rounded-2xl border bg-white shadow-sm p-5">
                <div className="flex items-center gap-3 text-lg font-semibold mb-3">
                  <Icon className="h-5 w-5" /> {title}
                </div>
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
              </div>
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
        subtitle="A snapshot of complex, large-scale work."
        img={photos.projects}
      />
      <section className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.name} className="rounded-2xl border bg-white shadow-sm p-5">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <p className="text-sm font-medium mt-2">{p.role}</p>
                <p className="mt-2 text-sm text-neutral-600">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CredentialsPage() {
  return (
    <>
      <Hero
        title="Credentials"
        subtitle="Competency, compliance, and proven delivery."
        img={photos.credentials}
      />
      <section className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <ul className="mt-6 grid md:grid-cols-2 gap-3 text-sm text-neutral-700 list-disc list-inside">
            <li>Qualifications & Certifications:</li>
            <ul className="ml-6 list-disc text-neutral-700">
              <li>CSCS Level 6 Construction Management</li>
              <li>SMSTS (Site Management Safety Training Scheme)</li>
              <li>CPCS A61 / A62 / A40a Appointed Person, Crane Supervisor, Slinger Signaller</li>
              <li>IPAF 3A/3B/1B – MEWP Operation</li>
              <li>IPAF MEWP for Managers</li>
              <li>Temporary Works Coordinator (BS5975)</li>
            </ul>
          </ul>
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
            <div className="rounded-2xl border bg-white shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="Your Name"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <input
                  placeholder="Company / Project"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <textarea
                  placeholder="Scope, dates, site constraints…"
                  rows={5}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  Submit
                </button>
              </form>
            </div>
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
                Available for short- and long-term engagements, CIS or PAYE.
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
              <HomeIcon className="h-4 w-4" /> Home
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
