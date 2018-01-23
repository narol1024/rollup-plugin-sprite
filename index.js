const spritesmith = require("./lib/spritesmith");
let isGenerated = false;
module.exports = customOptions => {
  return {
    name: "rollup-spritesmith",
    options(customOptions) {},
    resolveId(id) {},
    load() {
      if (isGenerated) {
        return null;
      } else {
        return new Promise(resolve => {
          spritesmith(customOptions, () => {
            isGenerated = true;
            return resolve(null);
          });
        });
      }
    },

    transform(code, id) {},
    intro() {},
    onwrite() {}
  };
};
