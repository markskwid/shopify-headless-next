import { MENU_TYPE } from "@/types/menu";
import Link from "next/link";

export const SubMenuList = ({ items }: { items: MENU_TYPE }) => (
  <ul>
    {items.map((sub: MENU_TYPE) => (
      <li key={sub.id}>
        <Link href={sub.url} aria-label={sub.label}>
          {sub.title}
        </Link>
      </li>
    ))}
  </ul>
);
