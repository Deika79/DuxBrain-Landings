import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // La API de leads declara runtime Node.js explícito; sin Cache Components.
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
