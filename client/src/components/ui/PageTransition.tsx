"use client";

import { usePathname } from "next/navigation";

// Uses a CSS animation instead of framer-motion initial/animate to avoid
// the blank-page bug where opacity:0 gets stuck if hydration is delayed.
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
