import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "centralechosite.local",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.hostinger.com",
        pathname: "/wp-content/uploads/**",
      },
      // Add your production domain here when ready:
      // {
      //   protocol: "https",
      //   hostname: "your-domain.com",
      //   pathname: "/wp-content/uploads/**",
      // },
    ],
  },
};

export default nextConfig;