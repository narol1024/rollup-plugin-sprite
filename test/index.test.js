import fs from "fs";
import path from "path";
import test from "ava";
import spritesmith from "../index";
import { rollup } from "rollup";

test("should output sprite image and stylesheet", t => {
  return rollup({
    input: "./test/samples/src/main.js",
    plugins: [
      spritesmith({
        src: {
          cwd: "./test/samples/src/images/sprite",
          glob: "**/*.png"
        },
        target: {
          image: "./test/samples/src/images/sprite.png",
          css: "./test/samples/src/scss/sprite.scss"
        },
        cssImageRef: "../images/sprite.png",
        output: {
          image: "./test/samples/dist/images/sprite.png",
          css:"./test/samples/dist/scss/sprite.scss"
        }
      })
    ]
  }).then(() => {
    t.true(
      fs.existsSync("./test/samples/src/images/sprite.png"),
      "file exists"
    );
    t.true(fs.existsSync("./test/samples/src/scss/sprite.scss", "file exit"));
    t.true(fs.existsSync("./test/samples/dist/images/sprite.png", "file exit"));
    t.true(fs.existsSync("./test/samples/dist/scss/sprite.scss", "file exit"));
  });
});

test("should output sprite image and texture json", t => {
  return rollup({
    input: "./test/samples/src/main.js",
    plugins: [
      spritesmith({
        src: {
          cwd: "./test/samples/src/images/sprite",
          glob: "**/*.png"
        },
        target: {
          image: "./test/samples/src/images/sprite.png",
          css: "./test/samples/src/json/sprite.json",
          format: 'json_texture'
        },
        cssImageRef: "../images/sprite.png",
        output: {
          image: "./test/samples/dist/images/sprite.png",
          css:"./test/samples/dist/json/sprite.json"
        }
      })
    ]
  }).then(() => {
    t.true(fs.existsSync("./test/samples/src/images/sprite.png"), "file exists");
    t.true(fs.existsSync("./test/samples/src/json/sprite.json", "file exist"));
    t.true(fs.existsSync("./test/samples/dist/images/sprite.png", "file exist"));
    t.true(fs.existsSync("./test/samples/dist/json/sprite.json", "file exist"));
  });
});

test("If set customTemplate option to a template file, should output the custom stylesheet.", t => {
  return rollup({
    input: "./test/samples/src/main.js",
    plugins: [
      spritesmith({
        src: {
          cwd: "./test/samples/src/images/sprite",
          glob: "**/*.png"
        },
        target: {
          image: "./test/samples/src/images/sprite.png",
          css: "./test/samples/src/css/sprite.css"
        },
        customTemplate:
          "./test/samples/src/customTemplate/css.template.handlebars"
      })
    ]
  }).then(async () => {
    t.true(
      fs.existsSync("./test/samples/src/images/sprite.png"),
      "file exists"
    );
    t.true(fs.existsSync("./test/samples/src/css/sprite.css", "file exit"));
    t.true(fs.existsSync("./test/samples/dist/images/sprite.png", "file exit"));

    let cssContent = await new Promise((resolve, reject) => {
      fs.readFile("./test/samples/src/css/sprite.css", function(err, data) {
        if (err) {
          return reject(null);
        }
        return resolve(data.toString());
      });
    });
    t.true(cssContent.indexOf(".custom-icon-hot") > -1);
    t.true(cssContent.indexOf(".custom-icon-new") > -1);
  });
});

test("If set customTemplate option to a template function, should output the custom stylesheet.", t => {
  const templateFunction = function(data) {
    return data.sprites
      .map(function(sprite) {
        return ".custom-N { width: Wpx; height: Hpx; background-image: url(I); background-position: Xpx Ypx; }"
          .replace("I", sprite.image)
          .replace("N", sprite.name)
          .replace("W", sprite.width)
          .replace("H", sprite.height)
          .replace("X", sprite.offset_x)
          .replace("Y", sprite.offset_y);
      })
      .join("\n");
  };
  return rollup({
    input: "./test/samples/src/main.js",
    plugins: [
      spritesmith({
        src: {
          cwd: "./test/samples/src/images/sprite",
          glob: "**/*.png"
        },
        target: {
          image: "./test/samples/src/images/sprite.png",
          css: "./test/samples/src/css/sprite.css"
        },
        customTemplate: templateFunction
      })
    ]
  }).then(async () => {
    t.true(
      fs.existsSync("./test/samples/src/images/sprite.png"),
      "file exists"
    );
    t.true(fs.existsSync("./test/samples/src/css/sprite.css", "file exit"));
    t.true(fs.existsSync("./test/samples/dist/images/sprite.png", "file exit"));

    let cssContent = await new Promise((resolve, reject) => {
      fs.readFile("./test/samples/src/css/sprite.css", function(err, data) {
        if (err) {
          return reject(null);
        }
        return resolve(data.toString());
      });
    });
    t.true(cssContent.indexOf(".custom-icon-hot") > -1);
    t.true(cssContent.indexOf(".custom-icon-new") > -1);
  });
});
