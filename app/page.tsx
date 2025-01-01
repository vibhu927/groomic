import Navbar from "@/components/landing/AppBar";
import { ModeToggle } from "@/components/DarkModeToggle";
import Image from "next/image";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Redirect } from "@/components/Redirect";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <>
      <Navbar />
      <Redirect/>
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
