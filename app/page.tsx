"use client";
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import Footer from "@/components/shared/Footer";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Scene />
      <Navbar />

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
