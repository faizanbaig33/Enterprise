/**
 * @param {import('next').NextConfig} nextConfig
 */
const coveoSitemapPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async rewrites() {
      return [
        ...await nextConfig.rewrites(),
        // coveo sitemap route
        {
          source: '/coveo-sitemap.xml',
          destination: '/api/coveo-sitemap',
        },
      ];
    },
  });
};

module.exports = coveoSitemapPlugin;
