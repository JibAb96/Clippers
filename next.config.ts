import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['qyrkipcyqmwzxzdngnir.supabase.co'],
      },
};

export default withNextVideo(nextConfig);