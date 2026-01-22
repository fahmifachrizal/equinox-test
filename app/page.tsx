"use client"

import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Assignment</Badge>
            <span className="text-sm text-muted-foreground">
              Equinox Technology Indonesia
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Equinox Technical Test
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            By Mukhammad Fahmi Fachrizal
          </p>
        </header>

        <Separator className="my-8" />

        {/* Content */}
        <div className="space-y-10 text-foreground text-sm sm:text-base">
          {/* Intro */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Assignment Overview
            </h2>
            <p className="leading-7">
              This application is my interpretation of the technical test
              assignment. As a dev, my focus was not just on meeting the
              checkboxes but on creating a system where data flows naturally
              between modules. The challenge required handling two distinct data
              sources with different requirements for pagination, detail views,
              and persistence.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Technology Stack
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Framework:</strong> Next.js 14 (App Router)
              </li>
              <li>
                <strong>Language:</strong> TypeScript (Full Type Safety)
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS & Shadcn UI
              </li>
              <li>
                <strong>State Management:</strong> Zustand (Session-wide
                Storage)
              </li>
              <li>
                <strong>Data Display:</strong> TanStack Table (Customized for
                Sorting & Pagination)
              </li>
            </ul>
          </section>

          {/* Entities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Data Entities
            </h2>
            <p className="leading-7 text-muted-foreground">
              The application manages two primary entities, each with unique
              data challenges:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-4 bg-muted/30">
                <h3 className="font-semibold mb-2 italic">Product Entity</h3>
                <p className="text-sm text-muted-foreground">
                  Consists of commerce data including pricing, categories, and
                  high-quality imagery. The interpretation for this entity
                  focused on <strong>Table Navigation</strong> and{" "}
                  <strong>Detail Accuracy</strong>.
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-muted/30">
                <h3 className="font-semibold mb-2 italic">Berry Entity</h3>
                <p className="text-sm text-muted-foreground">
                  PokéAPI data featuring nested attributes like firmness and
                  flavors. The challenge here was the{" "}
                  <strong>Waterfall Data Fetching</strong> (resolving names to
                  sprites and stats).
                </p>
              </div>
            </div>
          </section>

          {/* Logic & CRUD */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Technical Strategy & Interpretation
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-1">
                Global Storage & CRUD
              </h3>
              <p className="text-muted-foreground">
                I implemented a centralized store using <strong>Zustand</strong>{" "}
                to act as a mock backend. Since the APIs are read-only, I
                interpreted the "Persistence" requirement by merging server data
                with local modifications.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Products (Q1):</strong> Standard CRUD. I handled state
                  updates by tracking modified items in the store, ensuring that
                  edits or deletions are remembered as you navigate.
                </li>
                <li>
                  <strong>Berries (Q2):</strong> More complex implementation due
                  to the PokeAPI structure. I implemented a detail fetcher that
                  resolves the stats (flavor, firmness) only when needed,
                  optimizing the initial load.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-1">
                Advanced Pagination (Limit & Offset)
              </h3>
              <p className="text-muted-foreground">
                The assignment required specific pagination (10, 30, 50). My dev
                strategy for the Berries API:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>The Limit:</strong> I fetch an initial{" "}
                  <code>limit=60</code> items. This satisfies the user's initial
                  paging requests without extra loading spinners.
                </li>
                <li>
                  <strong>Next/Prev Navigation:</strong> I map the table
                  controls to the API's <code>offset</code> logic. When the user
                  reaches the end of the current buffer, the store triggers a
                  background fetch for the next <code>offset</code>, keeping the
                  "Live Search" and "Sorting" feeling native.
                </li>
                <li className="font-medium">
                  <strong>Technical Limitation:</strong> Since filtering and
                  sorting are handled client-side for performance, they only
                  apply to the data currently fetched in the store. To filter
                  the entire Pokémon database, a server-side search
                  implementation would be required.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-1">
                The Search Bar Interpretation
              </h3>
              <p className="text-muted-foreground">
                The task asked for "Live Search" and a "Navbar". I interpreted
                this as a <strong>Unified Hub</strong>.
              </p>
              <p className="text-muted-foreground">
                Instead of separate filters, I built a combined search bar that
                searches <em>Products</em> and <em>Berries</em> simultaneously.
                This solves the navigation requirement while providing a
                premium, context-aware experience (e.g., showing the currently
                viewed item as a reference point).
              </p>
            </div>
          </section>

          {/* Further Consideration */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Further Consideration
            </h2>
            <p className="leading-7 text-muted-foreground">
              While the current version fulfills the core requirements, there
              are architectural improvements planned for future iterations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Auth-Mapped Actions:</strong> I plan to implement
                role-based access control (RBAC). Currently, Edit and Delete
                actions are available to all users; moving forward, these will
                be gated behind authentication to ensure data integrity.
              </li>
              <li>
                <strong>Data Analytics Dashboard:</strong> I plan to add a
                dedicated dashboard page to present high-level statistics of the
                data (e.g., product price distributions, berry flavor potencies)
                using visual charts and metrics.
              </li>
            </ul>
          </section>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/en/products"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-6">
              Go to Products (Q1) <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/en/berries"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-6">
              Go to Berries (Q2) <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-12">
            &copy; 2026 Submission by Mukhammad Fahmi Fachrizal for Equinox
            Technology Indonesia
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
