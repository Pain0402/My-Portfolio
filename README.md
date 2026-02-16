# Creative Portfolio 2025

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPain0402%2FMy-Portfolio)

A high-performance, interactive portfolio website built with **Next.js 15**, **React Three Fiber**, and **Tailwind CSS v4**.

## 🚀 Key Features

*   **3D Space Environment:** Interactive star field background using Three.js & R3F.
*   **Scrollytelling:** Immersive storytelling experience using Framer Motion.
*   **Bento Grid:** Modern skills showcase layout.
*   **Project Showcase:** Horizontal scroll gallery with sticky positioning.
*   **Animations:** High-performance animations powered by Anime.js v4.
*   **Glassmorphism:** Consistent UI theme with frosted glass effects.

## 🛠️ Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS v4
*   **3D:** Three.js, React Three Fiber, Drei
*   **Animation:** Framer Motion, Anime.js v4, Lenis (Smooth Scroll)
*   **Language:** TypeScript
*   **Deployment:** Vercel (Recommended)

## 📦 Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Pain0402/My-Portfolio.git
    cd My-Portfolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

*   `app/`: Application routes and layouts.
*   `components/home/`: Hero, About, Projects, and Skills sections.
*   `components/three/`: 3D scene components (StarField, Scene).
*   `components/shared/`: Reusable layout components (Navbar, Footer).
*   `docs/`: Design/Architectural documentation.

## 🎨 Customization

*   **Theme:** Edit `app/globals.css` to change CSS variables for colors (Galaxy Theme).
*   **Content:** Update the text in `components/home/*.tsx` files.
*   **Projects:** Add new projects in `components/home/Projects.tsx` and `app/projects/[slug]/page.tsx`.

---

Designed & Built by **Tran Huu Giang**.
