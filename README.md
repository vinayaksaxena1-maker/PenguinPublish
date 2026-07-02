# MB Publishers - Premium Self-Publishing Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Analytics 4](https://img.shields.io/badge/Google_Analytics_4-E37400?style=for-the-badge&logo=google-analytics&logoColor=white)](https://analytics.google.com/)

A premium, state-of-the-art self-publishing platform built for **MB Publishers** (based in New Delhi, India). This application provides a modern frontend experience for authors and readers, paired with an advanced Admin CMS and a secure Author Portal to track sales and royalty payouts dynamically.

---

## 🌟 Key Features

### 1. High-End UI & Design Aesthetics
* **Premium Adaptive Dark Theme** as the default obsidian view, with full support for a clean light cream theme.
* **Fluid Micro-interactions** and smooth animated logo float/shimmer effects.
* **Symmetrical & Aligned Layouts** with elegant typography (Cinzel, Playfair Display, Inter) and premium grid structures.

### 2. Secure Author Royalty Portal
* **Personalized Dashboard** for authors to track metrics and submit support tickets.
* **Payouts & Sales Ledger Report:** A highly structured financial reporting table tracking book sales across platforms (Amazon, Flipkart) with fields for MRP, copies printed, copies sold, total royalty, paid royalty, and pending payouts.
* **Interactive Sales Chart:** Responsive monthly copies sold bar graph.

### 3. Dynamic Supabase CMS & Admin Console
* **Real-time CMS Updates:** Admin can modify homepage text, headers, images, pricing plans, FAQs, and testimonials dynamically without changing any code.
* **Book Catalog Manager:** Easily publish new books, upload high-quality cover images directly to Supabase Storage, and update live listings.
* **Payout & Sales Logger:** Admin utility to log monthly sales entries and record payouts per author.

### 4. Technical SEO & Marketing Optimizations
* **Dynamic Meta Tags (`useDocumentMetadata`):** CMS-driven page-specific Title, Description, and Social Share Card Images.
* **Local Delhi-NCR Search Focus:** Enhanced fallback metadata targeting local keywords (e.g., *"Book publishers in Delhi NCR"*, *"Self-publishing companies in Delhi"*).
* **Search Engine Ready:** Valid JSON-LD Schema (Organization Structured Data), dynamic `sitemap.xml`, and optimized `robots.txt` pointing to the live domain: **`https://mbpublishers.com/`**.

### 5. Web Analytics & SPA Tracking
* Fully integrated with **Google Analytics (GA4)** (`G-KXGXL8JZ0S`).
* Custom SPA Route Tracking (automatically registers a `page_view` event on every React route change).

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 & Vite
* **Programming Language:** TypeScript
* **Styling & Components:** Vanilla CSS & Tailwind CSS (Lucide Icons)
* **Backend Database & Storage:** Supabase (PostgreSQL & Storage Buckets)
* **Hosting Configuration:** Fully configured with `robots.txt` and `sitemap.xml` for `mbpublishers.com` production deployment.

---

## ⚙️ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/vinayaksaxena1-maker/PenguinPublish.git
cd PenguinPublish
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```

---

## 📂 Project Structure

```
├── public/                 # Static public files (sitemap.xml, robots.txt, favicon.ico)
├── src/
│   ├── assets/             # Images, logos, and animation files
│   ├── components/         # Reusable layouts (Nav, SiteFooter, BookCard, TopBar, etc.)
│   ├── hooks/              # Custom hooks (useDocumentMetadata)
│   ├── lib/                # Database clients & custom utility functions (useCMS)
│   ├── pages/              # Main routing pages (Home, Books, About, Pricing, Dashboard, etc.)
│   ├── App.tsx             # Main App Router entry point
│   ├── main.tsx            # DOM initialization point
│   └── index.css           # Global typography and premium styling sheets
└── index.html              # Main HTML entry with GA4 & Organization Schema
```
