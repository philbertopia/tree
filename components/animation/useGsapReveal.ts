"use client";

import { type RefObject, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseGsapRevealOptions {
  pulseSelector?: string;
  desktopOnlyPulse?: boolean;
}

let registered = false;

function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function useGsapReveal(rootRef: RefObject<HTMLElement | null>, options: UseGsapRevealOptions = {}) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll<HTMLElement>("[data-gsap]");

      if (reducedMotion) {
        gsap.set(targets, { autoAlpha: 1, clearProps: "filter,transform" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const heading = root.querySelectorAll<HTMLElement>('[data-gsap="heading"]');
        const images = root.querySelectorAll<HTMLElement>('[data-gsap="image"]');
        const cards = root.querySelectorAll<HTMLElement>('[data-gsap="card"]');
        const pills = root.querySelectorAll<HTMLElement>('[data-gsap="pill"], [data-gsap="process-item"]');
        const ctas = root.querySelectorAll<HTMLElement>('[data-gsap="cta"]');

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top 76%",
            once: true
          }
        });

        timeline
          .from(heading, { autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 0.72, stagger: 0.08 })
          .from(images, { autoAlpha: 0, y: 28, scale: 1.045, duration: 0.82, stagger: 0.1 }, "-=0.36")
          .from(cards, { autoAlpha: 0, y: 28, scale: 0.98, duration: 0.62, stagger: 0.07 }, "-=0.38")
          .from(pills, { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.05 }, "-=0.28")
          .from(ctas, { autoAlpha: 0, y: 14, scale: 0.98, duration: 0.45, stagger: 0.06 }, "-=0.22");

        images.forEach((image, index) => {
          gsap.to(image, {
            yPercent: index % 2 === 0 ? -4 : 4,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8
            }
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        const targets = root.querySelectorAll<HTMLElement>('[data-gsap="heading"], [data-gsap="image"], [data-gsap="card"], [data-gsap="pill"], [data-gsap="process-item"], [data-gsap="cta"]');

        gsap.set(targets, { autoAlpha: 1, clearProps: "filter,transform" });
      });

      if (options.pulseSelector) {
        const pulseTargets = root.querySelectorAll<HTMLElement>(options.pulseSelector);
        const pulseContext = options.desktopOnlyPulse ? "(min-width: 768px)" : "all";

        mm.add(pulseContext, () => {
          gsap
            .timeline({
              repeat: -1,
              repeatDelay: 0.8,
              scrollTrigger: {
                trigger: root,
                start: "top 78%",
                toggleActions: "play pause resume pause"
              }
            })
            .to(pulseTargets, {
              boxShadow: "0 0 26px rgba(74,222,128,0.18)",
              borderColor: "rgba(74,222,128,0.42)",
              y: -2,
              duration: 0.28,
              stagger: 0.16,
              ease: "power2.out"
            })
            .to(
              pulseTargets,
              {
                boxShadow: "0 0 0 rgba(74,222,128,0)",
                borderColor: "rgba(255,255,255,0.1)",
                y: 0,
                duration: 0.36,
                stagger: 0.16,
                ease: "power2.inOut"
              },
              0.26
            );
        });
      }

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, [options.desktopOnlyPulse, options.pulseSelector, reducedMotion, rootRef]);

  return reducedMotion;
}

export { gsap, ScrollTrigger, registerGsap };
