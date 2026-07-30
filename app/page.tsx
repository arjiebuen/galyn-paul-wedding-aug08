"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientWrapper from "@/components/common/ClientWrapper";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/hero/Hero";
import WeddingCountdown from "@/components/countdown/Countdown";
import Invitation from "@/components/invitation/Invitation";
import WeddingDetails from "@/components/details/WeddingDetails";
import DressCode from "@/components/attire/DressCode";
import OurStory from "@/components/story/OurStory";
import Timeline from "@/components/timeline/Timeline";
import Entourage from "@/components/entourage/Entourage";
import Gallery from "@/components/gallery/Gallery";
import Venue from "@/components/venue/Venue";
import RSVP from "@/components/rsvp/RSVP";
import FAQ from "@/components/faq/FAQ";
import PhotoUpload from "@/components/footer/PhotoUpload";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import MusicPlayer from "@/components/music/MusicPlayer";
import FireflyEffect from "@/components/common/FireflyEffect";

export default function Home() {
  const [initialSectionsLoaded, setInitialSectionsLoaded] = useState(false);
  const [fullSiteLoaded, setFullSiteLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [beatPulse, setBeatPulse] = useState(0);
  const lastBeatRef = useRef(0);

  const handleEnter = () => {
    setInitialSectionsLoaded(true);
  };

  const handleFullSiteLoaded = () => {
    setFullSiteLoaded(true);
  };

  const handleBeat = useCallback((intensity: number) => {
    const now = performance.now();
    if (intensity < 0.42 || now - lastBeatRef.current < 280) return;
    lastBeatRef.current = now;
    setBeatPulse((pulse) => pulse + 1);
  }, []);

  useEffect(() => {
    if (!fullSiteLoaded) return;
    requestAnimationFrame(() => {
      document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [fullSiteLoaded]);

  return (
    <>
      <ClientWrapper onEnter={handleEnter} />
      {initialSectionsLoaded && <FireflyEffect beatPulse={beatPulse} />}
      {initialSectionsLoaded && (
        <MusicPlayer
          autoPlay
          track={authenticated ? "afterAuthentication" : "opening"}
          onBeat={handleBeat}
        />
      )}
      <Navbar visible={fullSiteLoaded} />
      <main>
        {/* Hero - only after tap to enter */}
        {initialSectionsLoaded && (
          <Hero
            onAuthenticated={() => setAuthenticated(true)}
            onFullSiteLoaded={handleFullSiteLoaded}
          />
        )}

        {/* Full Site sections - only render after 15s invitation overlay */}
        {fullSiteLoaded && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                id="countdown"
                key="countdown"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
              >
                <WeddingCountdown />
              </motion.div>
            </AnimatePresence>
            <Invitation />
            <WeddingDetails />
            <DressCode />
            <Entourage />
            <Venue />
            <RSVP />
            <FAQ />
            <PhotoUpload />
          </>
        )}

        {/* Initial sections - visible immediately after tap to enter */}
        {initialSectionsLoaded && (
          <>
            <OurStory />
            <Timeline />
            <Gallery />
          </>
        )}
      </main>
      {initialSectionsLoaded && <Footer />}
      {fullSiteLoaded && <ScrollToTop />}
    </>
  );
}
