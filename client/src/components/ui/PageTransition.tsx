// Pure server component — CSS animation runs on every page mount automatically
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-page-in">{children}</div>;
}
