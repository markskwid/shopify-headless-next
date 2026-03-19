import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { CartProvider } from "@/context/Cart";
import { getCartAction } from "./(cart)/getCart/action";
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
  description: "MarkHeadless Project created using Next.js, Shopify, and Tailwind",
};

async function CartInitializer({ children }: { children: React.ReactNode }) {
  const cart = await getCartAction();
  if (!cart.success || !cart.data) {
  }

  const initialCartData = cart.data;
  return (
    <CartProvider initialCart={initialCartData}>
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
        <UIProvider>
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <CartInitializer>{children}</CartInitializer>
          </Suspense>
        </UIProvider>
        <Footer />
      </body>
    </html>
  );
}
