/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  basePath: "/engineer-king",
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: true,
  assetPrefix: "/engineer-king/out",
  async rewrites() {
    return [
      {
        source: "/engineer-king/out/:path*",
        destination: "/engineer-king/:path*",
      },
    ];
  },
};
