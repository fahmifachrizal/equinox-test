# Equinox Technical Test

**Assignment**  
Equinox Technology Indonesia  

**Author:** Mukhammad Fahmi Fachrizal  
**Year:** 2026  

---

## Assignment Overview

This application is my interpretation of the technical test assignment. The focus is not only on fulfilling the required features, but on building a cohesive system where data flows naturally between modules.

The challenge involved handling **two distinct data sources**, each with different requirements for:
- Pagination
- Detail views
- Local persistence

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (full type safety)
- **Styling:** Tailwind CSS & Shadcn UI
- **State Management:** Zustand (session-wide storage)
- **Data Display:** TanStack Table (customized sorting & pagination)

---

## Data Entities

The application manages two primary entities, each presenting unique technical challenges.

### 1. Product Entity
Commerce-style data including:
- Pricing
- Categories
- High-quality images

**Focus Areas:**
- Table navigation
- Detail accuracy
- CRUD operations with local persistence

---

### 2. Berry Entity
Data sourced from the PokéAPI, featuring:
- Nested attributes (firmness, flavors)
- Indirect references (name → detailed resource)

**Key Challenge:**
- Waterfall data fetching to resolve related stats only when required

---

## Technical Strategy & Interpretation

### Global Storage & CRUD

A centralized store using **Zustand** acts as a mock backend. Since the APIs are read-only, persistence is achieved by merging server data with local modifications.

- **Products (Q1):**
  - Full CRUD support
  - Modified and deleted items are tracked in the store and preserved during navigation

- **Berries (Q2):**
  - Detail data is fetched lazily
  - Flavor and firmness stats are resolved only when accessing the detail view to optimize performance

---

### Advanced Pagination (Limit & Offset)

The assignment specifies pagination options of **10, 30, and 50 items**.

**Berry pagination strategy:**
- An initial fetch of `limit=60` items satisfies early pagination needs without extra loading states
- Table navigation is mapped to the API’s `offset` logic
- When the current buffer is exhausted, the store fetches the next offset in the background

**Technical Limitation:**
- Filtering and sorting are performed client-side
- These operations only apply to currently fetched data
- Full-database filtering would require server-side support

---

### Search Bar Interpretation

The requirement for a **Navbar** and **Live Search** is interpreted as a **Unified Search Hub**.

- A single search bar queries both **Products** and **Berries**
- Provides contextual awareness (e.g., showing the currently viewed item)
- Eliminates the need for separate filters while improving navigation clarity

---

## Further Considerations

Planned architectural improvements for future iterations:

- **Auth-Mapped Actions**
  - Introduce role-based access control (RBAC)
  - Restrict Edit/Delete actions to authenticated roles

- **Data Analytics Dashboard**
  - Visualize high-level insights such as:
    - Product price distributions
    - Berry flavor potency metrics
  - Charts and KPIs for better data interpretation
