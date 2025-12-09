import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        root: path.join(__dirname, '..'),
    },
    experimental: {
        authInterrupts: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "unsplash.com",
                port: "",
                pathname: "/photos/**",
            },
            {
                protocol: "https",
                hostname: "media.istockphoto.com",
                port: "",
                pathname: "/id/**",
            },
            {
                protocol: "https",
                hostname: "img.daisyui.com",
                port: "",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "th.bing.com",
                pathname: "/th/*",
            },
            {
                protocol: "https",
                hostname: "www.istockphoto.com",
                pathname: "/photo/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/photos/**",
            },
        ],
    },
};

export default nextConfig;
