"use client";
import { motion } from "framer-motion";

export default function SectionTitle({ children, id }) {
  return (
    <motion.h2
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-scroll text-3xl md:text-4xl font-semibold border-b border-white/10 pb-3"
    >
      {children}
    </motion.h2>
  );
}
