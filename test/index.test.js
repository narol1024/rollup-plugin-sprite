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
          css: "./test/samples/src/sass/sprite.scss"
        },
        cssImageRef: "../images/sprite.png",
        extract: {
          image: "./test/samples/dist/images/sprite.png"
        }
      })
    ]
  }).then(bundle => {
    t.true(fs.existsSync("./test/samples/src/images/sprite.png"), "file exists");
    t.true(fs.existsSync("./test/samples/src/sass/sprite.scss","file exit"))
    t.true(fs.existsSync("./test/samples/dist/images/sprite.png","file exit"))
  });
});
