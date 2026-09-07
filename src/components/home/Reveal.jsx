import { useRef } from "react";
import { useInView } from "../../hooks/useInView";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
