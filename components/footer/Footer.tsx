import Link from "next/link";
import { Heart, Globe, Camera, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 bg-[#3A312C] text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Large Typography */}
        <h2 className="font-heading text-7xl md:text-9xl leading-tight">
          PAUL
        </h2>
        <p className="text-3xl font-heading my-4">&amp;</p>
        <h2 className="font-heading text-7xl md:text-9xl leading-tight">
          GALYN
        </h2>

        {/* Date & Venue */}
        <div className="mt-12 space-y-2 text-gray-400">
          <p className="text-lg">August 30, 2026</p>
          <p className="text-lg">Lla Madoma Agtarap Beachfront</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-10">
          <Link
            href="https://www.facebook.com/whoisgalyn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8A96A] transition-colors"
            aria-label="Facebook"
          >
            <Globe size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/galyn.sgallery?igsh=ZnYxdWI3YmM2Mm82"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8A96A] transition-colors"
            aria-label="Instagram"
          >
            <Camera size={20} />
          </Link>
          <Link
            href="https://m.me/whoisgalyn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8A96A] transition-colors"
            aria-label="Messenger"
          >
            <MessageCircle size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            Designed &amp; Developed with <Heart size={14} className="text-red-400" fill="currentColor" /> by
            <span className="text-[#C8A96A]">Vertex Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

