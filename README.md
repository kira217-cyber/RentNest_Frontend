# RentNest — Frontend

> Find & List Rental Properties with Ease

RentNest is a rental marketplace connecting tenants with verified rental
properties and giving landlords a clean dashboard to manage listings, rental
requests, and payments. This repository is the **frontend only** — built with
Next.js App Router and TypeScript against an already-deployed RentNest
backend (Node/Express/Prisma/PostgreSQL).

- **Live frontend:** https://rent-nest-frontend.vercel.app/
- **Backend API:** https://rentnest-backend.vercel.app/api
- **Backend API docs (Postman):** https://documenter.getpostman.com/view/55085333/2sBY4Jv2Tr
- **Demo video:** _add your video URL here_

## Features by Role

### Guest (unauthenticated)

- Browse the home page, featured properties, and category grid
- Search and filter properties by location, category, price range, bedrooms,
  and availability, with URL-synced filters and pagination
- View full property details, image gallery, amenities, landlord info, and
  reviews
- Register or log in (redirected back to the page they were on)

### Tenant

- Submit a rental request from a property's details page (Zod-validated
  move-in/move-out dates and message)
- Track rental requests with status badges (Pending/Approved/Rejected/
  Active/Completed/Cancelled) on an overview dashboard and a full list
- Pay for an approved, unpaid rental via a real Stripe Checkout session
- View payment history
- Leave a rating + comment review once a rental is Active/Completed with a
  completed payment

### Landlord

- Overview dashboard with property and request counts
- Full property CRUD: create, edit, delete, and toggle availability status
  inline, with amenities/image-URL tag inputs
- Review incoming rental requests and approve/reject with an optional note
  to the tenant

### Admin

- Platform-wide statistics dashboard with charts (rentals by status,
  tenants vs. landlords)
- Search/filter/paginate users and ban/unban them (guarded against
  self-ban and banning other admins)
- Full category CRUD
- Read-only moderation views for all properties and all rental requests,
  each with a detail page

## Technology Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- TanStack Query (server state, caching, invalidation)
- React Hook Form + Zod (every form)
- Axios (with a Bearer-token interceptor)
- Zustand (auth store)
- js-cookie (JWT persistence)
- sonner (toasts)
- Lucide React (icons)
- Recharts (admin dashboard charts)
- Stripe Checkout (redirect-based payment flow)

## Project Structure

```text
src/
├── app/                 # App Router routes
│   ├── (main)/           # Public pages (home, properties, auth, payment, unauthorized) — shares Navbar/Footer
│   └── dashboard/         # Role-protected dashboards (tenant/landlord/admin)
├── components/           # common/, forms/, layout/, properties/, dashboard/, auth/, tenant/, landlord/, admin/, home/
├── hooks/                # TanStack Query hooks per domain
├── lib/                  # api-client, error handling, query keys, utils, status/role helpers
├── providers/            # QueryProvider, AuthProvider, AppProviders
├── schemas/              # Zod schemas per form
├── services/             # Thin Axios wrappers per backend module
├── store/                # Zustand auth store
├── types/                # Types mirroring backend response shapes
└── proxy.ts               # Route protection (Next.js 16's renamed middleware.ts)
```

## Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```env
NEXT_PUBLIC_API_BASE_URL=https://rentnest-backend.vercel.app/api
NEXT_PUBLIC_APP_NAME=RentNest
```

No secret keys are used on the frontend — Stripe payment is a redirect-based
Checkout flow, so no publishable key is required client-side, and the backend
never exposes its secret key or JWT secret to this app.

## Local Setup

```bash
npm install
cp .env.example .env.local   # then edit if needed
npm run dev
```

Open http://localhost:3000. By default `.env.local` points at the live
deployed backend, so the app works immediately without running the backend
locally. To use a local backend instead, set
`NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api`.

## Verification Commands

```bash
npm run lint     # ESLint
npx tsc --noEmit # TypeScript type-check
npm run build    # Production build
```

## Admin Credentials

```text
Email: admin@rentnest.com
Password: 123456
```

## Test Payment Instructions

Payments use **Stripe Checkout in test mode**. From a tenant account, after
a landlord approves your rental request, click **Pay Now** and use any
[Stripe test card](https://docs.stripe.com/testing#cards), e.g.:

```text
Card number: 4242 4242 4242 4242
Expiry:      any future date
CVC:         any 3 digits
```

On success you're redirected to `/payment/success`, which confirms the
payment against the backend (never trusting the redirect URL alone) and
shows the real transaction ID. Cancelling the Stripe page redirects to
`/payment/cancel`, which offers a retry.

## Route Overview

| Route | Access |
|---|---|
| `/` | Public |
| `/properties`, `/properties/[id]` | Public |
| `/auth/login`, `/auth/register` | Guest (redirects away if already logged in) |
| `/payment/success`, `/payment/cancel` | Authenticated (tenant) |
| `/unauthorized` | Public |
| `/dashboard` | Any authenticated role (redirects to the role's dashboard) |
| `/dashboard/tenant/*` | Tenant only |
| `/dashboard/landlord/*` | Landlord only |
| `/dashboard/admin/*` | Admin only |

Dashboard routes are protected two ways: `proxy.ts` redirects guests (no
token cookie) to `/auth/login?redirect=...`, and a client-side `RoleGuard`
verifies the actual role via `/auth/me` and redirects cross-role access to
`/unauthorized` — the cookie's presence alone is never trusted for
authorization.

## Screenshots

_Add screenshots of the home page, properties list, property details, and
each dashboard here before submission._

## Deployment

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Set `NEXT_PUBLIC_API_BASE_URL` (and `NEXT_PUBLIC_APP_NAME` if desired) in
   the Vercel project's environment variables.
4. Deploy. No backend deployment is required — this project only talks to
   the already-deployed RentNest backend above.
5. Confirm the backend's CORS configuration allows your deployed frontend
   origin (the current backend uses an open CORS policy).

## API Integration

See [API_INTEGRATION.md](./API_INTEGRATION.md) for the full mapping of every
frontend page/component to the backend endpoint it calls.
