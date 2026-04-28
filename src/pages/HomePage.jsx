import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import HeroSection from '../components/HeroSection';
import WhatWeSell from '../components/WhatWeSell';
import Ticker from '../components/Ticker';
import Distinctions from '../components/Distinctions';
import MainLoader from '../components/MainLoader';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const tickerWrapRef = useRef(null);
  const trackRef = useRef(null);
  const [loaderVisible, setLoaderVisible] = useState(true);

  const handleFramesReady = useCallback(() => {
    setTimeout(() => setLoaderVisible(false), 400);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (!tickerWrapRef.current) return;

    // Timeline for the pinned section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: tickerWrapRef.current,
        start: "center center",
        end: "+=2000",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(".ticker-inner", { padding: '80px 0', duration: 0.2, ease: "power2.out" });
        },
        onLeave: () => {
          gsap.to(".ticker-inner", { padding: '24px 0', duration: 0.2, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(".ticker-inner", { padding: '80px 0', duration: 0.2, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(".ticker-inner", { padding: '24px 0', duration: 0.2, ease: "power2.out" });
        }
      }
    });

    tl.to(trackRef.current, {
      xPercent: -20,
      ease: "none"
    }, 0);

  }, { scope: tickerWrapRef });

  return (
    <>
      <MainLoader visible={loaderVisible} />
      <div className={`transition-opacity duration-700 ease-in-out ${loaderVisible ? 'opacity-0' : 'opacity-100'}`}>
        <main>
          <HeroSection onFramesReady={handleFramesReady} />
          <div className="bg-[#0B0B0B] relative z-10">
            <WhatWeSell />

            <div ref={tickerWrapRef}>
              <div className="ticker-inner bg-luxury-gold py-6 overflow-hidden">
                <Ticker ref={trackRef} className="ticker-track" />
              </div>
            </div>

            <Distinctions />
          </div>
        </main>
      </div>
    </>
  );
}
