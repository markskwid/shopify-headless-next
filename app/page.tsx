import { addToCart, createCart, getCart } from "@/lib/shopify/api/carts";
import {
  getCollectionByHandle,
  getCollections,
} from "@/lib/shopify/api/collections";
import { createCustomer, loginCustomer } from "@/lib/shopify/api/customer";
import { getMenuByHandle } from "@/lib/shopify/api/menus";
import { getProductByHandle, getProducts } from "@/lib/shopify/api/products";

export default async function Home() {
  const cart = await addToCart(
    "gid://shopify/Cart/hWN9251dzL1CwYDX9393yu2u?key=9e7aa0eef7e1099f69f98fc2ed6f59d4",
    { variantId: "gid://shopify/ProductVariant/48174651080959", quantity: 1 },
  );

  console.log(cart);

  // const products = await createCart();
  // console.log(products);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Test</h1>
    </div>
  );
}
