"use client";

export default function SectionTitle({
  children,
  id,
  eyebrow,
  description,
  align = "left",
}) {
  return (
    <div
      id={id}
      className={`section-scroll section-heading ${
        align === "center" ? "is-center" : ""
      }`}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title-text">{children}</h2>
      {description && (
        <p className="section-description">{description}</p>
      )}
    </div>
  );
}
