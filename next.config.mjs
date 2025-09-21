/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables based on the current environment
// This ensures NEXT_PUBLIC_API_BASE_URL is available during build time
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else { // Assuming UAT or other custom environments
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}


const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
