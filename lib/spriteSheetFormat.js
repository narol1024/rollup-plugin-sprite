const path = require("path");
const _ = require("lodash");

module.exports = (spritesmithResult, options) => {
  const generateSpriteName = fileName => {
    return path.parse(path.relative(options.src.cwd, fileName)).name;
  };
  const sprites = _.map(spritesmithResult.coordinates, function(
    oneSourceInfo,
    fileName
  ) {
    return _.assign({ name: generateSpriteName(fileName) }, oneSourceInfo);
  });
  const spritesheet = _.assign(
    { image: options.cssImageRef },
    spritesmithResult.properties
  );

  return {
    sprites: sprites,
    spritesheet: spritesheet
  };
};
