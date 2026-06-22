import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";
import PageTransition from "@/components/ui/PageTransition";
import AdminGuard from "@/components/layout/AdminGuard";

// Server component — shell renders on the server for instant paint on navigation
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard
      fallback={
        <>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ChatBot />
        </>
      }
    >
      {children}
    </AdminGuard>
  );
}
