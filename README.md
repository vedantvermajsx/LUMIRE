# EIRA · Maison de Haute Joaillerie

Eira is a luxury digital experience for a Parisian high-jewelry maison. Built with modern web technologies, it features immersive scroll-driven storytelling, high-fidelity visuals, and a sophisticated minimalist aesthetic that reflects the brilliance of diamond craftsmanship.

---

## Features

- **Immersive Hero Experience**: A scroll-synced AVIF frame animation system that creates a cinematic 3D journey through light and form.
- **Sophisticated UI**: Built with a custom "Luxury Dark" aesthetic using the Cinzel and Jost font families.
- **Dynamic Collections**: High-performance jewelry showcase with responsive grids and detail views.
- **Advanced Animations**: Smooth parallax effects, scroll-triggered reveals, and frame-accurate timing using GSAP and Lenis.
- **Administrative Suite**: Secure management interface for handling collections and piece metadata.
- **Responsive by Design**: Tailored experiences for both high-resolution desktops and mobile touch devices.

## Tech Stack

### Frontend
- **React**: Component-based UI architecture.
- **GSAP (GreenSock)**: Professional-grade animation and scroll orchestration.
- **Tailwind CSS**: Utility-first styling with custom luxury configuration.
- **Lenis**: High-performance smooth scrolling.
- **React Router**: Seamless client-side navigation.

### Backend & Infrastructure
- **Node.js & Express**: Robust API services.
- **Cloudinary**: High-performance media delivery and asset management.
- **Render**: Scalable cloud deployment configuration.

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   CLOUDINARY_URL=your_cloudinary_url
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```

4. Start Development Server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/components`: Reusable UI modules (Hero, Navbar, Ticker, etc.)
- `/src/pages`: Main application views and route components.
- `/src/styles`: Global CSS variables and keyframe animations.
- `/server`: Express API configuration and media services.
- `/public/frames`: High-fidelity animation assets.

##  License

Private and Confidential. All rights reserved by Eira.
