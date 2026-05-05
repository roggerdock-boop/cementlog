import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
