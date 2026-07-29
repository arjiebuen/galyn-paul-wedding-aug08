"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section
      id="story"
      className="relative py-40 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dalnsh7fy/image/upload/v1785286485/512_lz4req.png')" }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative max-w-5xl mx-auto px-8 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="tracking-[8px] uppercase text-center text-sm text-white/80">
            Our Journey
          </p>
          <h2 className="font-heading text-7xl text-center my-10 text-white">
            A Love Story
          </h2>
          <p className="leading-10 text-lg text-center text-white/90 max-w-3xl mx-auto">
            Paul and Galyn met in 2018—well, actually, he met her, but she didn&apos;t meet him. Confusing, right? He knew her name, but she didn&apos;t know his.
            <br /><br />
            <em>&ldquo;Nakita na kita dati dito sa Luna nung nag-attend ka dito sa church namin.&rdquo;</em>
            <br /><br />
            Those were his exact words when he reached out to her on October 7, 2019. But she couldn&apos;t recall ever meeting him—likely because it was a brief encounter, and she has a hard time remembering faces and names at first.
            <br /><br />
            He searched for her on the &ldquo;blue app&rdquo; using only her first name—and somehow, he found her.
            <br /><br />
            In May 2020, Paul reached out again by buying a t-shirt and a jacket she was selling online. Still, they didn&apos;t get to meet because when he picked up his order, it was Galyn&apos;s supplier who met him, not her.
            <br /><br />
            Then in June 2020, they finally met again at church. That&apos;s where things started to take shape. What began as casual conversations gradually became something more. From calling him &ldquo;Kuya&rdquo; to eventually calling him &ldquo;Love,&rdquo; their relationship officially began on August 18, 2021.
            <br /><br />
            Over the years, they shared life together—through small moments, challenges, and growth. After almost five years, they decided to take the next step in June 2026 and begin a new chapter this coming August.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

