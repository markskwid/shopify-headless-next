import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { CartProvider } from "@/context/Cart";
import { CartSlider } from "@/components/CartSlider/CartSlider";
import { UIProvider } from "@/context/UserInterface";
import { Footer } from "@/components/Footer/Footer";
import { Suspense } from "react";

const interFont = Inter({
  variable: "--font-google",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MarkHeadless Project",
  description:
    "MarkHeadless Project created using Next.js, Shopify, and Tailwind",
};

async function CartInitializer({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider initialCart={null}>
      <Header />
      <CartSlider />
      {children}
    </CartProvider>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <UIProvider>
            <Suspense fallback={<div className="min-h-screen"></div>}>
              <CartInitializer>{children}</CartInitializer>
            </Suspense>
          </UIProvider>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
