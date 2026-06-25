export const formatFulfillmentStatus = (status: string) => {
  const map: Record<string, { label: string; color: string }> = {
    FULFILLED: { label: "Delivered", color: "bg-green-100 text-green-700" },
    UNFULFILLED: {
      label: "Processing",
      color: "bg-yellow-500 text-yellow-700",
    },
    PARTIALLY_FULFILLED: {
      label: "Partially Shipped",
      color: "bg-blue-500 text-blue-700",
    },
    IN_PROGRESS: { label: "In Progress", color: "bg-blue-500 text-blue-700" },
  };
  return (
    map[status] ?? { label: status, color: "bg-neutral-300 text-neutral-700" }
  );
};
