"use client";

import { motion } from "framer-motion";

interface SubGroup {
  label: string;
  members: string[];
}

interface EntourageGroup {
  role: string;
  members?: string[];
  subGroups?: SubGroup[];
}

const entourage: EntourageGroup[] = [
  {
    role: "Officiating Minister",
    members: ["Pastor Fernan Mangcal"],
  },
  {
    role: "Parents of the Groom",
    members: ["Rustico Giron"],
  },
  {
    role: "Parents of the Bride",
    members: ["Gaudencio Castro", "Beverlyn Gawingan"],
  },
  {
    role: "Best Man",
    members: ["Randel Bautista"],
  },
  {
    role: "Maid of Honor",
    members: ["Glyn Castro"],
  },
  {
    role: "Principal Sponsors",
    members: [
      "Mr. Fernan Mangcal & Mrs. Neryn Mangcal",
      "Mr. Ryan Sibayan & Mrs. Riza Sibayan",
      "Mr. Jeffrey Boadilla & Mrs. Magelyn Boadilla",
      "Mr. Gaudiel Felicitas & Mrs. Bonnalyn Felicitas",
      "Mr. Florentino Villanueva & Mrs. Rosita Villanueva",
      "Mr. Jing Cutamora & Mrs. Mary Ann Cutamora",
      "Mr. Ricardo Florendo & Mrs. Marieta Florendo",
      "Mr. Danny Fabito & Mrs. Criselda Fabito",
      "Mr. Leo Mauro & Mrs. Rovie Mauro",
      "Mr. George Bautista & Mrs. Lenie Bautista",
      "Mr. Roger Bautista & Mrs. Rosanna Bautista",
      "Mr. Rico Nebrida & Mrs. Francisca Nebrida",
      "Ms. Cecil Delarmente",
      "Ms. Edna Galang",
      "Mr. Pontestante Padua",
    ],
  },
  {
    role: "Brides Maids",
    members: [
      "Jemimah Hanah Sibayan",
      "Keziah Jireh Sibayan",
      "Charice Yoma",
      "Vhianne Mauro",
      "Ailish Delarmente",
      "Lady Mae Castro",
      "Generose Forbes",
      "Sheila May Cabanban",
      "Mikaela Lim",
      "Krisna Gwyneth Estioco",
      "Angela Grace Quinitip",
      "Joan Alarcon",
    ],
  },
  {
    role: "Groomsmen",
    members: [
      "Gadine Castro",
      "Aljur Cruz",
      "Ronel Bautista",
      "Alexander Giron",
      "Jake Nebrida",
      "Lesmond Villanueva",
      "Christian Castro",
      "Bernabe Castro",
    ],
  },
  {
    role: "Secondary Sponsors",
    subGroups: [
      {
        label: "Veil",
        members: ["Mr. Rodrigo Giron", "Ms. Kristine Giron"],
      },
      {
        label: "Cord",
        members: ["Mr. John Bernard Nallana", "Ms. Jessamae Ringor"],
      },
      {
        label: "Candle",
        members: ["Mr. Miguel Anton Dumayas", "Ms. Rhainzel Laconsay"],
      },
    ],
  },
  {
    role: "Bearers",
    subGroups: [
      {
        label: "Ring Bearer",
        members: ["Elihu Shadrach Sibayan"],
      },
      {
        label: "Bible Bearer",
        members: ["Zayn Asher Giron"],
      },
      {
        label: "Coin Bearer",
        members: ["Rayn Zion Giron"],
      },
    ],
  },
  {
    role: "Flower Girls",
    members: [
      "Zylie Azari Corpuz",
      "Zoe Avery Corpuz",
      "Faith Keren Sibayan",
      "Josaiah Boadilla",
      "Chloe Jane Lopez",
      "Roewin Sapphire Adara Giron",
    ],
  },
];

export default function Entourage() {
  return (
    <section id="entourage" className="py-32 bg-[#FAF7F4]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-16"
        >
          Our Entourage
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {entourage.map((group, index) => (
            <motion.div
              key={group.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-8 shadow-xl text-center"
            >
              <h3 className="text-xl font-semibold text-[#C8A96A] mb-4 uppercase tracking-wider">
                {group.role}
              </h3>

              {/* Plain member list */}
              {group.members && (
                <div className="space-y-2">
                  {group.members.map((member) => (
                    <p key={member} className="text-gray-700 text-lg">
                      {member}
                    </p>
                  ))}
                </div>
              )}

              {/* Sub-groups (for Secondary Sponsors & Bearers) */}
              {group.subGroups && (
                <div className="space-y-4">
                  {group.subGroups.map((sub) => (
                    <div key={sub.label}>
                      <p className="text-sm font-semibold text-[#C8A96A] uppercase tracking-wider mb-1">
                        {sub.label}
                      </p>
                      {sub.members.map((m) => (
                        <p key={m} className="text-gray-700 text-lg">
                          {m}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

