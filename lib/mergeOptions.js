const _ = require("lodash");
module.exports = customOptions => {
  return _.merge(
    {
      src: {
        cwd: "./src/images/sprite",
        glob: "*.png"
      },
      target: {
        image: "./src/images/sprite.png",
        css: "./src/css/sprite.css"
      },
      output: {
        image: "./dist/images/sprite.png"
      },
      cssImageRef: "../images/sprite.png"
    },
    customOptions
  );
};
