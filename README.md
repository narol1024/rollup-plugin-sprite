# rollup-plugin-sprite

converts set of images into a spritesheet and SASS/LESS/Stylus mixins based on spritesmith for [Rollup.js](https://github.com/rollup/rollup).  


[![Build Status](https://travis-ci.org/linjinying/rollup-plugin-sprite.svg?branch=master)](https://travis-ci.org/linjinying/rollup-plugin-sprite)
[![NPM version](https://img.shields.io/npm/v/rollup-plugin-sprite.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-sprite)
[![NPM package download of month](https://img.shields.io/npm/dm/rollup-plugin-sprite.svg)](https://www.npmjs.com/package/rollup-plugin-sprite)
[![Coverage Status](https://coveralls.io/repos/github/linjinying/rollup-plugin-sprite/badge.svg?branch=master)](https://coveralls.io/github/linjinying/rollup-plugin-sprite?branch=master)

## Installation

```Shell
npm i rollup-plugin-sprite -D
```

## Usage

```javascript
import spritesmith from "rollup-plugin-sprite";

export default {
  input: "src/main.js",
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
      output: {
        image: "./dist/images/sprite.png"
      },
      spritesmithOptions: {
        padding: 5
      }
    })
  ]
};
```

## Config
- `src` - used to build list of source images.
    - `cwd` should be the closest common directory for all source images;
    - `glob` it is a glob. such as `**/*.png`
	
- `target` - set files path where generated the sprite or stylesheet.
    - `image` - target image filename;
    - `css` - can be one of the following, `scss`,`less`,`css`,`stylus`,`json`.see [details](https://github.com/twolfson/spritesheet-templates#templates)

- `cssImageRef` - optional, path by whic h generated image will be referenced in API. If target.image is interpolated, cssImageRef should be interpolated the same way too. Default: `../images/sprite.png`

- `output` - optional, set output folder where the sprite or stylesheet will be saved.
  - `image` - the image file path  
  - `css` - the stylesheet path
  
- `spritesmithOptions` - optional. Options for [spritesmith](https://github.com/Ensighten/spritesmith).

- `customTemplates` - optional. Object with keys and values corresponding to format names and template descriptions respectively. Template description can be either a path/to/template/file.handlebars or template function.

## License

Released under the [MIT license](./LICENSE).
