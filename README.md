# Elessi — E-Commerce Web Application

## Project Overview

Elessi is a React storefront for browsing a product catalog, viewing product details, managing a cart and wishlist, and entering checkout and account flows. Product and review requests use an Axios client configured for a Supabase REST endpoint; cart and wishlist state are stored in the browser.

## Features

- Product catalog with paginated listings and filters for color, size, brand, type, and price.
- Product detail pages with image galleries, color and size selection, stock-aware quantity controls, and ratings.
- Product-name search in the header search drawer. The separate `/search` route currently displays a heading and does not show search results.
- Cart editing, quantity totals, and wishlist management, with both collections persisted in local storage.
- Product review display and a review form that submits updates through the API client.
- Checkout contact and address form with validation. Payment is not implemented; the payment section states that the store cannot accept payments.
- Product carousels labeled “You May Also Like” and “Recently Viewed.” Both fetch a product list and shuffle it; viewed-product history is not tracked.

## Tech Stack

| Category              | Technologies used in the application                               |
| --------------------- | ------------------------------------------------------------------ |
| Frontend              | React 18, JavaScript, JSX                                          |
| Routing               | React Router DOM                                                   |
| Data fetching / state | Axios, TanStack React Query, React Context, browser `localStorage` |
| Services              | Supabase JavaScript client                                         |
| Styling / UI          | Sass, Material UI Slider, Swiper, React Icons, React Hot Toast     |
| Forms / validation    | Formik, Yup                                                        |
| Development tools     | Vite, ESLint, JSON Server                                          |

## Project Architecture

The app is organized as a single-page React application. Route-level pages compose feature-oriented components; shared contexts hold cart and wishlist state, and utility modules configure API clients.

```text
.
├── db.json
├── server.js
├── public/
│   ├── assets/images/
│   └── data/data.json
└── src/
	├── App.jsx
	├── main.jsx
	├── Layout/Layout.jsx
	├── router/routing.jsx
	├── pages/
	│   ├── home/
	│   ├── shop/
	│   ├── singleShop/
	│   ├── shopCart/
	│   ├── Wishlist/
	│   ├── checkOut/
	│   ├── search/
	│   ├── login/
	│   ├── register/
	│   └── Error/
	├── components/
	│   ├── Store/
	│   ├── WishlistContaxt/
	│   ├── FilterShop/
	│   ├── Reviews/
	│   ├── CardSingleShop/
	│   └── ...
	├── styles/
	└── utils/
		├── axiosConfig.jsx
		└── supabaseClient.jsx
```

## Data Management

- Catalog, product-detail, and review requests are made with Axios through `src/utils/axiosConfig.jsx`. Its base URL and API key headers come from Vite environment variables. TanStack React Query manages these requests and review updates.
- `src/utils/supabaseClient.jsx` creates a Supabase client used by account flows and auth-state listeners.
- `public/data/data.json` contains product data and is the file served by the `npm run server` script. The frontend Axios client is configured from `VITE_SUPABASE_URL`; it is not automatically pointed at that local JSON Server.
- Cart and wishlist values initialize from and are written to `localStorage` in `src/App.jsx`. The keys are `Cart Products` and `Wishlist Products`.

## Shopping Features

- **Cart:** Add products with a selected color, size, and quantity; edit quantities or remove items; view a calculated subtotal. Cart contents persist in local storage.
- **Wishlist:** Toggle products in and out of the wishlist. Wishlist contents persist in local storage.
- **Product details and variants:** Product pages show available images, colors, sizes, price, stock, and review rating. Selected color and size are included with cart items.
- **Search:** The header drawer filters the loaded catalog by product name after a short input delay. The `/search` page is not connected to this search behavior.
- **Filtering:** The shop filters by color, size, brand, type, and a price range. Product listings are paginated.
- **Reviews:** Existing reviews and ratings are displayed on product pages. The review form validates input and sends a product update through Axios.
- **Related products:** Two Swiper carousels display shuffled products other than the current product; neither records browsing history or calculates product similarity.

## Authentication

Authentication is only partially integrated with Supabase. Login calls `supabase.auth.signInWithPassword` and then reads the matching row from the `users` table. Registration instead checks and inserts a row in that table, hashing the submitted password in the browser with `bcryptjs`; it does not create a Supabase Auth account. These two flows are therefore not a complete, consistent account lifecycle. Supabase auth-state listeners update parts of the UI.

## UI and Responsive Design

The interface uses project-authored Sass stylesheets with media queries for desktop, tablet, and mobile layouts, including separate desktop and mobile navigation. Swiper powers banners and product carousels; Material UI supplies the shop price slider. React Icons and React Hot Toast provide icons and toast feedback.

## Installation

Requires Node.js and npm.

```bash
npm install
```

Configure the environment variables listed below before using API-backed pages and account flows.

## Available Scripts

| Command           | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite development server.                                 |
| `npm run build`   | Create a production build with Vite.                               |
| `npm run preview` | Serve the built app locally for preview.                           |
| `npm run lint`    | Run ESLint across the project.                                     |
| `npm run server`  | Start JSON Server on port `5000`, serving `public/data/data.json`. |

## Environment Variables

The source references these Vite variables:

| Variable                     | Used for                                         |
| ---------------------------- | ------------------------------------------------ |
| `VITE_SUPABASE_URL`          | Axios API base URL.                              |
| `VITE_SUPABASE_API_KEY`      | Axios `apikey` and bearer authorization headers. |
| `VITE_SUPABASE_API_KEY_ANON` | Supabase JavaScript client key.                  |

Vite variables are included in browser code. Use only client-appropriate public values; never place a Supabase service-role key or other server secret in a `VITE_` variable.

## Development

1. Install dependencies with `npm install` and configure the environment variables above.
2. Start the frontend with `npm run dev`; use the local address printed by Vite.
3. `npm run server` is available to serve `public/data/data.json` on port `5000`. The frontend Axios client still uses `VITE_SUPABASE_URL`, so running this script alone does not switch the app to local data.

The root `server.js` is a separate custom JSON Server implementation that listens on port `3000` when started directly with `node server.js`. It is not invoked by an npm script.

## Production Build

Run `npm run build`. Vite writes the build to `dist/`, its default output directory; the project does not override that directory in `vite.config.js`.

## Project Highlights

- Client-side routing and shared layouts with React Router.
- Server-state queries and mutations using TanStack React Query.
- Context-based cart and wishlist state synchronized to local storage.
- Product filtering, variant selection, form validation, and responsive Sass styling.
- Supabase and local JSON Server integrations are present, with distinct configuration paths.

## Future Improvements

Possible follow-up work, not current functionality:

- Use one consistent Supabase Auth registration and login flow.
- Connect the search route to search results and refine the product-query behavior.
- Integrate a payment provider and persist completed orders.
- Align the local JSON Server API with the frontend's configured Axios endpoints.
