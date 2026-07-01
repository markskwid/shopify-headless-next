import { getHomepageBanner } from "@/lib/shopify/api/metaobjects";
import BannerCarousel from "./BannerCarousel";

export default async function Banner() {
  const { data: slides } = await getHomepageBanner();
  if (!slides?.length) return null;
  return <BannerCarousel slides={slides} />;
}
