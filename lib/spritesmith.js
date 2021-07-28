const spritesmith = require("spritesmith");
const glob = require("glob");
const path = require("path");
const extname = path.extname;
const _ = require("lodash");
const gaze = require("gaze");
const writeFile = require("write");
const fs = require("fs");
const templater = require("spritesheet-templates");
const mergeOptions = require("./mergeOptions");
const spriteSheetFormat = require("./spriteSheetFormat");
const mimeTypes = {
  ".css": "css",
  ".scss": "scss",
  ".sass": "sass",
  ".less": "less",
  ".styl": "stylus",
  ".json": "json"
};

module.exports = (customOptions, callback) => {
  const options = mergeOptions(customOptions);
  const customTemplate = options.customTemplate;
  const { src, target, output } = options;
  const init = () => {
    glob(src.cwd + "/" + src.glob, (err, files) => {
      if (err) {
        throw err;
      }
      spritesmith.run(
        _.merge({}, { src: files }, customOptions.spritesmithOptions),
        (err, result) => {
          if (err) {
            throw err;
          }
          //Custom template
          const cssFormat = customTemplate
            ? "spritesmith-custom"
            : (target.format || mimeTypes[extname(target.css)]);
          if (typeof customTemplate === "string") {
            templater.addHandlebarsTemplate(
              cssFormat,
              fs.readFileSync(customTemplate, "utf-8")
            );
          } else if (typeof customTemplate === "function") {
            templater.addTemplate(cssFormat, customTemplate);
          }
          const spriteSheetContent = templater(
            spriteSheetFormat(result, options),
            {
              format: cssFormat
            }
          );
          // write the sprite image file and stylesheet
          Promise.all([
            writeFile(target.image, result.image),
            writeFile(target.css, spriteSheetContent),
            output.image
              ? writeFile(output.image, result.image)
              : Promise.resolve(),
            output.css
              ? writeFile(output.css, spriteSheetContent)
              : Promise.resolve()
          ]).then(callback);
        }
      );
    });
  };
  init();
  if (options.watch) {
    gaze(src.glob, { cwd: src.cwd }, (err, watcher) => {
      watcher.on("all", init);
    });
  }
};
