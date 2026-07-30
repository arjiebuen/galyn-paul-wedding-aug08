"use client";

import { useState } from "react";
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

export default function Home() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [countdownReady, setCountdownReady] = useState(false);

  return (
    <>
      <ClientWrapper />
      <Navbar />
      <main>
        <Hero
          onInvitationOpened={() => setInvitationOpened(true)}
          onCountdownReady={() => setCountdownReady(true)}
        />
        <AnimatePresence mode="wait">
          {countdownReady && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as const, // smooth cubic-bezier
              }}
            >
              <WeddingCountdown />
            </motion.div>
          )}
        </AnimatePresence>
        {invitationOpened && <Invitation />}
        <OurStory />
        <Timeline />
        <WeddingDetails />
        <DressCode />
        <Entourage />
        <Gallery />
        <Venue />
        <RSVP />
        <FAQ />
        <PhotoUpload />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
