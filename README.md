# rollup-plugin-sprite

converts set of images into a spritesheet and SASS/LESS/Stylus mixins based on spritesmith for Rollup

[![Build Status](https://travis-ci.org/linjinying/rollup-plugin-sprite.svg?branch=master)](https://travis-ci.org/linjinying/rollup-plugin-sprite)
[![NPM version](https://img.shields.io/npm/v/rollup-plugin-sprite.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-sprite)
[![NPM version](https://img.shields.io/npm/dm/rollup-plugin-sprite.svg)](https://www.npmjs.com/package/rollup-plugin-sprite)
[![Coverage Status](https://coveralls.io/repos/github/linjinying/rollup-plugin-sprite/badge.svg?branch=master)](https://coveralls.io/github/linjinying/rollup-plugin-sprite?branch=master)

## Installation

```Shell
npm i rollup-plugin-sprite -D
```

## Usage

```javascript
import spritesmith from "rollup-plugin-sprite";

export default {
  entry: "src/main.js",
  plugins: [
    spritesmith({
      src: {
        cwd: "./src/ui/images/sprite",
        glob: "**/*.png"
      },
      target: {
        image: "./src/ui/images/sprite.png",
        css: "./src/ui/sass/sprite.scss"
      },
      cssImageRef: "../images/sprite.png",
      extract: {
        image: buildImagesDir + "/sprite.png"
      },
      spritesmithOptions: {
        padding: 5
      }
    })
  ]
};
```

## Config
- `src` - used to build list of source images
    - `cwd` should be the closest common directory for all source images;
    - `glob` well... it is a glob
	
- `target` - generated files
    - `image` - target image filename;
    - `css` - can be one of the following, `scss`,`less`,`css`

- `cssImageRef` - path by whic h generated image will be referenced in API. If target.image is interpolated, cssImageRef should be interpolated the same way too. 	

- `spritesmithOptions` - optional. Options for [spritesmith](https://github.com/Ensighten/spritesmith)

## License

Released under the [MIT license](./LICENSE).
