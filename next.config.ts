import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/locksmith-livingstone',
        destination: '/locksmith-livingston',
        permanent: true,
      },
      {
        source: '/oojo',
        destination: '/oojo/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
