"use client";

export default function SectionTitle({ children, id }) {
  return (
    <h2 id={id} className="section-title">
      <span>{children}</span>
    </h2>
  );
}
