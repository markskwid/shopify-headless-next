import { clientConfig } from "@/config/client.config";

export default function StoreLogo() {
  return (
    <span className="font-bold text-2xl text-black">
      {clientConfig.store.name}
    </span>
  );
}
