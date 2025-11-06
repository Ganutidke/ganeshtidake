"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9, // buttery smooth
      easing: (t) => 1 - Math.pow(1 - t, 3), // custom cubic easing
      smoothWheel: true,
      lerp: 0.05, // inertia
      wheelMultiplier: 0.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
