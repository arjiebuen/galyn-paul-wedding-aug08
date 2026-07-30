"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "Story", href: "#story" },
  { label: "Wedding", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" },
  { label: "RSVP", href: "#rsvp" },
];

function scrollToSection(href: string) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

interface NavbarProps {
  visible?: boolean;
}

export default function Navbar({ visible = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    scrollToSection(href);
  };

  if (!visible) return null;

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-5 left-1/2 z-50
        -translate-x-1/2
        rounded-full
        border border-white/20
        bg-white/15
        backdrop-blur-xl
        px-8
        py-4
        hidden md:block"
      >
        <div className="flex gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-white hover:text-yellow-200 duration-300 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Hamburger */}
      <motion.button
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-5 right-5 z-50 md:hidden
        w-12 h-12 rounded-full
        border backdrop-blur-xl
        flex items-center justify-center transition-all duration-300
        ${
          scrolled
            ? "bg-white border-gray-200 text-[#3A312C] shadow-md"
            : "bg-white/15 border-white/20 text-white"
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl pt-24 px-8"
            >
              <div className="flex flex-col gap-6">
                {links.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(item.href);
                      }}
                      className="text-2xl font-heading text-[#3A312C] hover:text-[#C8A96A] transition-colors block cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
