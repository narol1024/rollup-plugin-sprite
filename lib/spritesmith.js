const spritesmith = require("spritesmith");
const glob = require("glob");
const path = require("path");
const extname = path.extname;
const _ = require("lodash");
const gaze = require("gaze");
const writeFile = require("write");
const templater = require("spritesheet-templates");
const mergeOptions = require("./mergeOptions");
const spriteSheetFormat = require("./spriteSheetFormat");
const mimeTypes = {
  ".css": "css",
  ".scss": "scss",
  ".less": "less",
  ".styl": "stylus"
};

module.exports = (customOptions, callback) => {
  const options = mergeOptions(customOptions);
  const init = () => {
    glob(options.src.cwd + "/" + options.src.glob, (err, files) => {
      if (err) {
        throw err;
      }
      spritesmith.run(
        _.merge({}, { src: files }, customOptions.spritesmithOptions),
        (err, result) => {
          if (err) {
            throw err;
          }
          const spriteSheetContent = templater(
            spriteSheetFormat(result, options),
            {
              format: mimeTypes[extname(options.target.css)]
            }
          );
          // write the sprite image file and stylesheet
          Promise.all([
            writeFile(options.target.image, result.image),
            writeFile(options.extract.image, result.image),
            writeFile(options.target.css, spriteSheetContent)
          ]).then(() => {
            callback();
          });
        }
      );
    });
  };
  init();
  gaze(options.src.glob, { cwd: options.src.cwd }, (err, watcher) => {
    watcher.on("all", init);
  });
};
