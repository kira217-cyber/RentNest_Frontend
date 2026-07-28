# API Integration Documentation

This document maps every RentNest frontend page/component to the real backend
endpoint it calls. All endpoints below are actually consumed by the deployed
frontend (nothing here is aspirational or mock data).

## Environment

- `NEXT_PUBLIC_API_BASE_URL` — backend API base URL (defaults to
  `http://localhost:5000/api` if unset). Production value:
  `https://rentnest-backend.vercel.app/api`.
- Authentication: JWT returned in the login/register response body, stored in
  a `rentnest_token` cookie via `js-cookie`, and attached as
  `Authorization: Bearer <token>` by an Axios request interceptor
  (`src/lib/api-client.ts`). The backend does **not** set an httpOnly cookie,
  so the frontend owns persistence and attachment.
- Error shape: every non-2xx response is normalized by
  `getApiErrorMessage()` (`src/lib/error.ts`), which prefers the backend's
  `message` field and falls back to a friendly generic message.
- Data fetching/caching: TanStack Query, with query keys centralized in
  `src/lib/query-keys.ts`. 4xx responses are never retried (see
  `src/providers/query-provider.tsx`) so error/not-found states render
  immediately instead of after a wasted retry.

## Authentication

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `RegisterForm` (`/auth/register`) | POST | `/auth/register` | Public | Register a tenant or landlord |
| `LoginForm` (`/auth/login`) | POST | `/auth/login` | Public | Authenticate and receive a JWT |
| `AuthProvider` (app-wide, on mount when a token cookie exists) | GET | `/auth/me` | Bearer | Hydrate the current user into the auth store |

## Categories

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `CategoriesSection` (home), `PropertyFilters`, `PropertyForm` category select | GET | `/categories` | Public | List categories for browsing/filtering/forms |
| `CategoryFormModal` — create | POST | `/categories` | Admin | Create a category |
| `CategoryFormModal` — edit | PATCH | `/categories/:id` | Admin | Update a category |
| Admin Categories page — delete | DELETE | `/categories/:id` | Admin | Delete a category (backend rejects if in use) |

## Properties

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `FeaturedProperties` (home), `PropertiesView` (`/properties`) | GET | `/properties` | Public | List/search/filter/paginate properties |
| `PropertyDetailsView` (`/properties/[id]`) | GET | `/properties/:id` | Public | Load a single property |
| Landlord Properties page, Edit Property page | GET | `/properties/my-properties` | Landlord | List the landlord's own properties (incl. unpublished) |
| `NewPropertyPage` (`/dashboard/landlord/properties/new`) | POST | `/properties` | Landlord | Create a property |
| `EditPropertyView`, `LandlordPropertyCard` status select | PATCH | `/properties/:id` | Landlord | Update a property / toggle status |
| `LandlordPropertyCard` — delete | DELETE | `/properties/:id` | Landlord | Delete a property |

## Rentals

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `RentalRequestModal` (property details) | POST | `/rentals` | Tenant | Submit a rental request |
| Tenant Overview / Rentals / Reviews pages | GET | `/rentals` | Tenant | List the tenant's own rental requests |
| `PayView` (`/dashboard/tenant/requests/[id]/pay`) | GET | `/rentals/:id` | Tenant/Landlord/Admin | Load one rental request to verify payment eligibility |
| Landlord Overview / Requests pages | GET | `/rentals/landlord/requests` | Landlord | List incoming requests for the landlord's properties |
| `RequestActionModal` | PATCH | `/rentals/landlord/requests/:id` | Landlord | Approve/reject a pending request with an optional note |

## Payments

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `PayView` — "Pay Now with Stripe" | POST | `/payments/create` | Tenant | Create a Stripe Checkout session; frontend redirects to the returned `checkoutUrl` |
| `PaymentSuccessView` (`/payment/success`) | POST | `/payments/confirm` | Tenant | Confirm payment status using the Stripe `session_id` query param (never trusts the URL alone) |
| Tenant Payments page | GET | `/payments` | Tenant | List the tenant's payment history |

`POST /payments/webhook` is backend-only (Stripe calls it directly) and is
never called from the frontend.

## Reviews

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| `ReviewFormModal` (tenant rentals/reviews pages) | POST | `/reviews` | Tenant | Submit a rating + comment for a property (backend enforces completed-payment eligibility and no duplicates) |
| `PropertyReviews` (property details), `ReviewEligibleCard` (tenant reviews page) | GET | `/reviews/property/:propertyId` | Public | List reviews for a property / check if the current tenant already reviewed it |

## Admin

| Frontend page/component | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| Admin Overview page | GET | `/admin/dashboard` | Admin | Platform-wide stats + recent users/rentals |
| Admin Users page | GET | `/admin/users` | Admin | Search/filter/paginate users |
| `BanUserDialog` | PATCH | `/admin/users/:id/status` | Admin | Ban/unban a user (`{ status: "ACTIVE" \| "BANNED" }`) |
| Admin Properties page | GET | `/admin/properties` | Admin | Search/filter/paginate all properties |
| Admin Property Detail page | GET | `/admin/properties/:id` | Admin | Full property detail incl. landlord, rental requests, reviews |
| Admin Rentals page | GET | `/admin/rentals` | Admin | Search/filter/paginate all rental requests |
| Admin Rental Detail page | GET | `/admin/rentals/:id` | Admin | Full rental detail incl. tenant, property, payment |

## Notable backend behaviors the frontend relies on

- `GET /properties` and `GET /properties/:id` only return **published**
  properties, so the landlord's own property list/edit flow reads from
  `GET /properties/my-properties` instead (it includes unpublished listings).
- Rental request creation rejects: unpublished/unavailable properties, a
  landlord requesting their own property, past move-in dates, a move-out
  date before move-in, and a second PENDING/APPROVED/ACTIVE request for the
  same property (409). All of these surface as the backend's own message via
  the shared error toast.
- Payment creation rejects a rental that isn't `APPROVED` or that already has
  a `COMPLETED` payment; the frontend mirrors this client-side
  (`isRentalPayable`) before even showing the Pay Now button, but still
  relies on the backend as the source of truth.
- A review is only accepted when the tenant has an `ACTIVE` or `COMPLETED`
  rental for that property **with a `COMPLETED` payment**; the frontend
  mirrors this via `isRentalReviewable` for the same reason.
- Admin cannot ban/unban another admin or themselves (400/403) — the ban
  button is disabled client-side for those rows with an explanatory
  `title`, in addition to the backend's own guard.
