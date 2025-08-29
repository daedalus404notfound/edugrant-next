// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost", // keep localhost
    "192.168.56.1", // allow LAN IP
    "*.192.168.56.1", // allow subdomains if any
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
