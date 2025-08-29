"use client";

export default function SectionTitle({ children, id }) {
  return (
    <h2
      id={id}
      className="section-scroll text-3xl md:text-4xl font-semibold border-b border-white/10 pb-3"
    >
      {children}
    </h2>
  );
}
