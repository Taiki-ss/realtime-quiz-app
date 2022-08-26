/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/quiz": { page: "/quiz" },
    };
  },
  trailingSlash: true,
};
