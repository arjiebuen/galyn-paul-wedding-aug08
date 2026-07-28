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
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function Home() {
  return (
    <>
      <ClientWrapper />
      <Navbar />
      <main>
        <Hero />
        <WeddingCountdown />
        <Invitation />
        <OurStory />
        <Timeline />
        <WeddingDetails />
        <DressCode />
        <Entourage />
        <Gallery />
        <Venue />
        <RSVP />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
