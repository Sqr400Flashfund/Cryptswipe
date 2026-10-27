import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { deferMotion } from "@/lib/defer-motion";

let observer: IntersectionObserver | undefined;
const initialized = new WeakSet<Element>();

function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target;
      if (!initialized.has(el)) {
        initialized.add(el);
        if (entry.isIntersecting) {
          observer?.unobserve(el);
          continue;
        }
        el.classList.add("reveal");
      }
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        observer?.unobserve(el);
      }
    }
  });
  return observer;
}

/** Fades content in on scroll. Content is visible without JS (class added only after mount). */
export function Reveal({ children, className, as: Tag = "div", delay = 0 }: { children: ReactNode; className?: string; as?: ElementType; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cancel = deferMotion(() => getObserver().observe(el));
    return () => {
      cancel();
      observer?.unobserve(el);
      initialized.delete(el);
    };
  }, []);
  return (
    <Tag ref={ref} className={cn(className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
