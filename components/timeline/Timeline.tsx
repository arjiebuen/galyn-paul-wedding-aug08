"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Infinity } from "lucide-react";

const milestones = [
  {
    icon: Heart,
    date: "2020",
    title: "First Met",
    description: "Two souls crossed paths, not knowing it was the beginning of forever.",
  },
  {
    icon: Star,
    date: "2021",
    title: "First Date",
    description: "A simple coffee date that turned into hours of conversation and laughter.",
  },
  {
    icon: Sparkles,
    date: "2026",
    title: "The Proposal",
    description: "Under the stars, down on one knee, the question that changed everything.",
  },
  {
    icon: Infinity,
    date: "2026",
    title: "The Wedding",
    description: "Two families become one as we say 'I do' before God and our loved ones.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-20"
        >
          Our Journey
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#D8C3B5] hidden md:block" />

          <div className="space-y-16">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8 md:gap-0"
                >
                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-0 md:translate-x-[-50%]">
                    <div className="w-16 h-16 rounded-full bg-[#F8F4EF] border-2 border-[#D8C3B5] flex items-center justify-center">
                      <Icon className="text-[#C8A96A]" size={24} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 md:ml-20">
                    <div className="rounded-2xl bg-[#F8F4EF] p-6 shadow-lg">
                      <span className="text-[#C8A96A] font-semibold text-sm tracking-widest uppercase">
                        {item.date}
                      </span>
                      <h3 className="text-2xl font-semibold mt-2">{item.title}</h3>
                      <p className="text-gray-600 mt-3 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

