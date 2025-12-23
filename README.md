## 🛠️ Technologies

### Frontend

![Next.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg)
![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)
![TypeScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg)
![Tailwind](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg)

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**
- **TanStack Table v8**
  - virtualization
  - column management
  - client-side sorting & filtering
- **Recharts**
  - P&L, exposure and aggregate visualizations
- **Jotai**
  - global and local view state
  - columns, sorting, selected issue
- **Tailwind CSS**
- **PrimeReact**
- **Better Auth** (frontend authentication)

---

### Backend

![FastAPI](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg)
![PostgreSQL](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg)

- **FastAPI**
- **Swagger / OpenAPI**
- **PostgreSQL**
- Backend-side filtering of **order intentions**
- Explicit API contracts (OpenAPI)

---

### Dev & Tooling

![GitHub](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg)

- ESLint + Prettier
- Jest + React Testing Library
- GitHub Actions (CI/CD)

---

## Flow: New Issue → Backend Filtering

1. User selects a **New Issue** (frontend)
2. The selected issue is stored in a **Jotai atom**
3. A request is triggered to a **FastAPI endpoint**
4. Backend:
   - filters **order intentions** by issue
   - returns pre-processed domain data
5. Frontend:
   - updates the TanStack Table
   - preserves column configuration and sorting

> The frontend **does not perform domain-level filtering** — business logic remains on the backend.

---

## Key Features

### 1. Dynamic View Controller

- Reusable `BlotterControlBar`
- Height variants (compact / expanded)
- Actions:
  - Refresh
  - Column Selector
  - Reset Order
  - Clear Sorting

---

### 2. Column System (TanStack Table)

- Centralized `columns.ts` definition
- Configuration includes:
  - accessor
  - cell renderer
  - sizing (min / max / fixed)
- Business logic lives **exclusively inside cell renderers**
- Persistence:
  - column order
  - visibility
  - sorting (localStorage)

---

### 3. Virtualized Tables

- Optimized for very large datasets
- Minimal re-rendering
- Buy / Sell / P&L color coding
- Client-side sort & filter (view-only)

---

### 4. Charts (Recharts)

- Position aggregates
- P&L over time
- Exposure per instrument
- Shared data source with tables

---

## Design Principles

- **Backend = single source of truth**
- Frontend focuses on:
  - presentation
  - interaction
  - view configuration
- No “magic logic” hidden in the UI
- Data scalability over visual polish

---

## Status

Actively developed  
API documentation available via **Swagger UI**

---

## Dashboard Preview

![Dashboard Preview](./public/assets/images/dashboard-image.png)
