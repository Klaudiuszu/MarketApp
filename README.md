## 🛠️ Technologies

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![TanStack Table](https://img.shields.io/badge/TanStack_Table-v8-FF4154?logo=reacttable&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Charts-22B5BF)
![Jotai](https://img.shields.io/badge/Jotai-State-000000)

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

![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?logo=swagger&logoColor=black)

- **FastAPI**
- **Swagger / OpenAPI**
- **PostgreSQL**
- Backend-side filtering of **order intentions**
- Explicit API contracts (OpenAPI)

---

### Dev & Tooling

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-Code_Quality-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?logo=prettier&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)

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
