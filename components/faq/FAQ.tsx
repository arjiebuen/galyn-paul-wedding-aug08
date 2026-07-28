"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Will parking be available?",
    answer: "Yes, complimentary parking will be available at the venue. Valet service will also be provided for your convenience.",
  },
  {
    question: "May I bring a plus one?",
    answer: "Due to limited capacity, we kindly ask that only those named on the invitation attend. Thank you for understanding.",
  },
  {
    question: "When should I arrive?",
    answer: "We recommend arriving at least 30 minutes before the ceremony at 3:00 PM to allow time for parking and settling in.",
  },
  {
    question: "What should I wear?",
    answer: "The dress code is semi-formal. Please refer to our dress guide for the suggested color palette.",
  },
  {
    question: "Where is the reception?",
    answer: "The reception will be held at the same venue — La Madomma Agtarap Beachfront — immediately following the ceremony.",
  },
  {
    question: "Can I take photos?",
    answer: "We have a professional photographer and videographer to capture every moment. We kindly ask for an unplugged ceremony, but feel free to take photos during the reception.",
  },
  {
    question: "Who should I contact?",
    answer: "For any inquiries, please contact the couple directly or reach out to our wedding coordinator. Details will be provided in your invitation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-16"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-[#C8A96A]" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

