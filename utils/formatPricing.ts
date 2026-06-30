import { clientConfig } from "@/config/client.config";

export const formatPrice = (amount: string, currency: string) => {
  return new Intl.NumberFormat(clientConfig.locale.language, {
    style: "currency",
    currency: currency ?? clientConfig.locale.currency,
    minimumFractionDigits: 2,
  }).format(Number(amount));
};
