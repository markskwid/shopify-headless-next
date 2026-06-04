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
import { cookies } from "next/headers";
import { AuthProvider } from "@/context/Auth";
import { getCustomer } from "@/lib/shopify/api/customer";

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

async function AuthInitializer({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("customerAccessToken")?.value;
  const customer = token ? await getCustomer(token) : null;

  return (
    <AuthProvider
      initialState={{
        isLoggedIn: !!customer,
        firstName: customer?.data.firstName || null,
        lastName: customer?.data.lastName || null,
      }}
    >
      {children}
    </AuthProvider>
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
          <AuthInitializer>
            <UIProvider>
              <Suspense fallback={<div className="min-h-screen"></div>}>
                <CartInitializer>{children}</CartInitializer>
              </Suspense>
            </UIProvider>
          </AuthInitializer>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
