import { useEffect, useState } from "react";

export function useInView(ref, { threshold = 0.16, once = true, rootMargin = "0px 0px -8% 0px" } = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, once, rootMargin]);

  return visible;
}
