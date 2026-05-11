import { Header } from "@/components/Header";
import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Header />
      <main className={`flex-1 ${className}`}>{children}</main>
      <footer className="bg-card border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} سوق الواحة. صُنع بكل{" "}
            <span className="text-primary">❤️</span> باستخدام{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
