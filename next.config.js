/** @type {import('next').NextConfig} */
module.exports = {
	exportPathMap: async function (
	  defaultPathMap,
	  { dev, dir, outDir, distDir, buildId }
	) {
	  return {
		'/': { page: '/' },
		'/quiz': { page: '/quiz' },
	  }
	},
	trailingSlash: true
  }