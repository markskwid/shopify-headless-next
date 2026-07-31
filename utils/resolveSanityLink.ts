import { InternalLinkItem } from "@/types/navigation";

export function resolveSanityLink(item: InternalLinkItem) {
  if (item.linkType === "product") {
    return item.productHandle ? `/product/${item.productHandle}` : "#";
  }

  if (item.linkType === "collection") {
    return item.collectionHandle ? `/collection/${item.collectionHandle}` : "#";
  }

  if (item.linkType === "custom") {
    return item.customPath || "#";
  }

  return "#";
}
