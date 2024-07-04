const path = require("path");

module.exports = {
  // Other configurations...
  module: {
    rules: [
      // Other loaders...
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: path.join(__dirname, "helpers"),
          partialDirs: path.join(__dirname, "partials"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".hbs"],
  },
};
