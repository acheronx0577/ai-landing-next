import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Automate Intelligence. Accelerate Growth.",
  description:
    "AI-powered SaaS platform to streamline operations, automate tasks, and make smarter data-driven decisions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className="overflow-x-clip">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
