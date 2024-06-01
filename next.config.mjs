import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/videos/",
              outputPath: "static/videos/",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      });
    }
    return config;
  },
};

export default withNextVideo(nextConfig);
