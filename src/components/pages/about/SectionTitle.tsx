'use client';

import { motion } from 'framer-motion';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <>
      <div className="overflow-hidden pb-1.5">
        <motion.h2
          initial={{ x: '-50%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          className="text-4xl lg:text-7xl font-semibold"
        >
          {title}
        </motion.h2>
      </div>
      <motion.span
        initial={{ width: '0' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.25 }}
        className="block h-0.5 bg-gray-500"
      />
    </>
  );
}
