// src/components/CardSlide.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { containerVariants, cardVariants } from "@/components/motion/cardSlider";
import { cards } from "@/components/objects/cardSlideData";

const CardSlide = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative z-10">
            <h3 
              className="text-2xl font-bold text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: card.title }}
            />
            <p className="text-gray-600 mb-6 min-h-[80px]">
              {card.content}
            </p>
            <Link href={card.route}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group-hover:shadow-lg">
                {card.buttonText}
              </button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardSlide;