# 🏠 HomeFinder — Real Estate Listing Website

A simple, modern platform where buyers and renters can **search, filter and compare**
properties in one place. Built as a hackathon MVP with **HTML, CSS, React and Supabase**.

---

## ✨ Features

| # | Feature | Where |
|---|---------|-------|
| 1 | Home page with hero, search bar and Buy / Rent buttons | `components/Home.jsx` |
| 2 | Property listings as responsive cards | `components/PropertyList.jsx`, `PropertyCard.jsx` |
| 3 | Search & filters (location, Buy/Rent, type, price range) | `components/SearchFilter.jsx` |
| 4 | Property details page with an Enquire button | `components/PropertyDetails.jsx` |
| 5 | Compare 2–3 properties side by side | `components/CompareProperties.jsx` |
| 6 | Supabase database (`properties` table) | `lib/supabaseClient.js`, `supabase-schema.sql` |
| 7 | Fully responsive (desktop, tablet, mobile) | `App.css`, `index.css` |

---

## 🚀 Getting started

You need **Node.js 18 or newer**. Then, inside the `homefinder` folder:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open the printed address (usually **http://localhost:5173**).

> **The app works immediately** — if Supabase is not configured yet it automatically
> loads 10 built-in demo properties so nothing is ever blank during a presentation.

---

## 🗄️ Connecting Supabase (optional but recommended)

1. Create a free project at **[supabase.com](https://supabase.com)**.
2. In the dashboard go to **SQL Editor → New query**, paste the whole contents of
   [`supabase-schema.sql`](./supabase-schema.sql) and click **Run**.
   This creates the `properties` table, enables read-only public access, and inserts
   10 sample rows.
3. Go to **Project Settings → API** and copy two values.
4. Copy `.env.example` to a new file called `.env` and paste them in:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

5. **Restart** the dev server (Ctrl+C, then `npm run dev`). The yellow demo banner
   disappears and listings now come from your database.

### The `properties` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | bigint | primary key |
| `title` | text | e.g. "Skyline Residency" |
| `location` | text | e.g. "Andheri West, Mumbai" |
| `price` | numeric | sale price or monthly rent |
| `type` | text | Apartment / Villa / Independent House / Studio / Plot |
| `listing_type` | text | `Buy` or `Rent` |
| `bedrooms` | integer | `null` for plots |
| `bathrooms` | integer | `null` for plots |
| `area` | numeric | size in square feet |
| `description` | text | shown on the details page |
| `image_url` | text | image link |

---

## 📁 Project structure

```
homefinder/
├── index.html                  # HTML shell + font + #root
├── supabase-schema.sql         # table + sample data (paste into Supabase)
├── .env.example                # copy to .env and add your keys
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # ⭐ state & screen switching live here
    ├── index.css               # design tokens + shared classes
    ├── App.css                 # component layout + responsive rules
    ├── data/
    │   └── sampleProperties.js # fallback demo data
    ├── lib/
    │   ├── supabaseClient.js   # one Supabase connection
    │   ├── propertyApi.js      # fetchProperties() + filterProperties()
    │   └── format.js           # price / area / number helpers
    └── components/
        ├── Navbar.jsx
        ├── Home.jsx
        ├── SearchFilter.jsx
        ├── PropertyList.jsx
        ├── PropertyCard.jsx
        ├── PropertyDetails.jsx
        ├── CompareProperties.jsx
        ├── CompareBar.jsx
        ├── Footer.jsx
        └── Icons.jsx           # small inline SVG icons
```

---

## 🧠 How it works (great for the presentation)

**No router library.** `App.jsx` keeps a tiny `page` object in state —
`{ name: 'home' | 'listings' | 'details' | 'compare', propertyId }` — and renders the
matching component. Fewer moving parts, easier to explain.

**One source of truth.** All shared state lives in `App.jsx`:

- `properties` — every listing, fetched **once** from Supabase on page load
- `filters` — the current search/filter values
- `compareIds` — which properties are selected for comparison (maximum 3)
- `page` — which screen is showing

Child components are *presentational*: they receive data through **props** and report
back through **callback props** (`onViewDetails`, `onToggleCompare`, …). This is the
standard "lifting state up" React pattern.

**Filtering** happens in `filterProperties()` in `lib/propertyApi.js` — a pure function,
so it is easy to test and explain. All rows are fetched once and filtered in the
browser, which makes results feel instant. *(A production app would push the filters
into the Supabase query instead.)*

**Compare** stores only ids, then looks up the full objects with `.find()`. The lowest
price in a comparison is highlighted with a simple `Math.min`.

---

## 🎬 Demo flow

> **Home → Search Property → Filter Results → View Property → Select Properties → Compare Properties**

1. **Home** — land on the hero, type "Bengaluru" and press **Search**.
2. **Filter** — on the listings page set *Buy or Rent = For Rent*, *Type = Apartment*
   and a max price; the grid updates instantly.
3. **View** — click **View Details** on a card to see the full page, then hit
   **Enquire now** to show the contact modal.
4. **Select** — back on the listings, tick the **Compare** checkbox on 2–3 cards. A
   dark bar slides up at the bottom of the screen.
5. **Compare** — press **Compare** to see price, location, type, bedrooms, bathrooms
   and size side by side, with the lowest price highlighted.

---

## 🛠️ Available scripts

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

---

## 📌 Scope

Deliberately **left out** to keep the MVP focused and demoable: payments, maps,
AI recommendations, authentication, admin dashboards and heavy animations.
