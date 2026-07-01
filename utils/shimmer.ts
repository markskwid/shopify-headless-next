export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e5e7eb" />
      <stop offset="50%" stop-color="#f3f4f6">
        <animate attributeName="offset" values="-1;2" dur="1.5s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#e5e7eb">
        <animate attributeName="offset" values="0;3" dur="1.5s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
