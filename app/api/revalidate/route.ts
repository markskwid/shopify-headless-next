import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { serverConfig } from "@/config/server.config";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256") ?? "";

  const digest = crypto
    .createHmac("sha256", serverConfig.webhookSecret)
    .update(body)
    .digest("base64");

  if (digest !== hmac) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic") ?? "";
  const payload = JSON.parse(body);

  switch (topic) {
    case "products/update":
    case "products/create":
    case "products/delete": {
      revalidateTag("products", "max");

      if (payload.handle) {
        revalidateTag(`product-${payload.handle}`, "max");
      }

      break;
    }

    case "collections/update":
    case "collections/create":
    case "collections/delete": {
      revalidateTag("collections", "max");

      if (payload.handle) {
        revalidateTag(`collection-${payload.handle}`, "max");
      }

      break;
    }

    case "inventory_levels/update": {
      revalidateTag("products", "max");
      break;
    }
  }

  return NextResponse.json({ revalidated: true });
}
