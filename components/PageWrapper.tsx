import { ReactElement } from "react";

export const PageWrapper = ({ children }: { children: ReactElement }) => {
  return <div className="vw-max-w mt-10">{children}</div>;
};
