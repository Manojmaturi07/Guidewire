import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GigGuardLogo } from "../components/GigGuardLogo";
import { Button } from "../components/ui/Button";
import { useAppContext } from "../context/AppContext";
import { HowItWorks } from "./HowItWorks";

export function Landing() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  
  // Refs for tracking GSAP elements
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const glowingOrbRef = useRef(null);

  // Split text into letters for stagger effect
  const brandName = "GigGuard AI";

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // GSAP Timeline Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0. Initial hidden state guarantees no flashes
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0, rotationY: -90 });
      gsap.set(titleContainerRef.current.children, { y: 50, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(buttonsRef.current.children, { y: 30, opacity: 0 });
      gsap.set(glowingOrbRef.current, { scale: 0, opacity: 0 });

    // 1. Orb pulses in behind
    tl.to(glowingOrbRef.current, {
      scale: 1,
      opacity: 0.4,
      duration: 2,
      ease: "power2.out"
    });

    // 2. The Logo spins to face forward and scales up into place
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.7)"
    }, "-=1.5");

    // 3. Stagger the letters of the brand name
    tl.to(titleContainerRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=1.0");

    // 4. Subtitle slides in
    tl.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6
    }, "-=0.2");

    // 5. Buttons pop up sequentially
    tl.to(buttonsRef.current.children, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.5)"
    }, "+=0.2");

    // After Intro, set up infinite floating animation on logo and orb
    tl.call(() => {
      // Continuous float
      gsap.to(logoRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      // Continuous pulse on background orb
      gsap.to(glowingOrbRef.current, {
        scale: 1.2,
        opacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    }, containerRef); // Match GSAP context scope and close it securely
    
    return () => ctx.revert(); // GSAP Context gracefully cleans up all tweens and timelines
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-background relative overflow-x-hidden"
    >
      {/* 🚀 HERO SECTION (Full Height) */}
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Background Grid & Gradient */}
        <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80" />
      
      {/* Dynamic Glowing Orb Behind Logo */}
      <div 
        ref={glowingOrbRef}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-500/30 rounded-full blur-[100px] z-0"
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Floating Logo Animation via GSAP - Pure SVG, zero boundaries! */}
        <div ref={logoRef} className="mb-6 relative group perspective-[1000px]">
          <GigGuardLogo className="w-32 h-32 md:w-48 md:h-48 relative z-10 filter brightness-[1.2] drop-shadow-[0_0_30px_rgba(99,102,241,0.6)]" />
        </div>

        {/* GSAP Staggered Text Reveal */}
        <div className="overflow-hidden flex gap-[0.1rem]" ref={titleContainerRef}>
          {brandName.split("").map((char, i) => (
            <span 
              key={i} 
              className={`text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50 inline-block ${char === " " ? "w-4 md:w-6" : ""}`}
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="overflow-hidden mt-4 h-8 flex items-center justify-center">
          <p 
            ref={subtitleRef}
            className="text-xl text-muted-foreground flex items-center gap-2 font-medium"
          >
            <ShieldCheck className="w-5 h-5 text-success" />
            Autonomous Parametric Protection
          </p>
        </div>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-md px-4"
        >
          <Button 
            size="lg" 
            className="w-full h-14 text-lg rounded-xl shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all"
            onClick={() => navigate("/login")}
          >
            Login
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-14 text-lg rounded-xl border-border bg-card/50 backdrop-blur-md hover:bg-card hover:border-muted"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Bounce scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>

    {/* 📖 BELOW THE FOLD: PITCH DECK & EXPLANATION */}
    <div className="relative z-20 bg-background pt-10">
      <HowItWorks />
    </div>

    </div>
  );
}
