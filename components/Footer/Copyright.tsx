"use client";

export const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-2">
      © {currentYear} Mark Headless. All rights reserved.
    </div>
  );
};
