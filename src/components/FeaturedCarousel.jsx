import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple horizontal scroll carousel.
 */
export default function FeaturedCarousel({ slides = [] }) {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex gap-4 min-w-max px-2">
        {slides.length === 0 ? (
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded min-w-[300px] flex-shrink-0">
            <h2 className="text-2xl font-bold">Build daily habits</h2>
            <p className="mt-2">Track, mark complete, and grow streaks.</p>
          </div>
        ) : slides.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 rounded bg-white shadow min-w-[300px] flex-shrink-0"
          >
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
