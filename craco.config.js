const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Form": path.resolve(__dirname, "src/form/"),
      "@Layouts": path.resolve(__dirname, "src/layouts/"),
      "@Services": path.resolve(__dirname, "src/services/"),
      "@Pages": path.resolve(__dirname, "src/pages/"),
      "@Utils": path.resolve(__dirname, "src/utils/"),
      "@Contexts": path.resolve(__dirname, "src/contexts/"),
    },
  },
};
