/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  basePath: "/realtime-quiz-app",
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: true,
  assetPrefix: "/realtime-quiz-app/",
  async rewrites() {
    return [
      {
        source: "/realtime-quiz-app/out/:path*",
        destination: "/realtime-quiz-app/:path*",
      },
    ];
  },
};
