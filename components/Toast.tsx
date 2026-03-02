import { sileo, Toaster } from "sileo";

enum TOAST_TYPE {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}
export const Toast = (
  toastType: TOAST_TYPE,
  message: string,
  title: string,
) => {
  const renderToast = () => {
    switch (toastType) {
      case "SUCCESS":
        sileo.success({ title });
      default:
        return null;
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      {renderToast()}
    </>
  );
};
