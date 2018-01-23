# rollup-plugin-sprite

Create a sprite sheet based on spritesmith for Rollup

[![Build Status](https://travis-ci.org/linjinying/rollup-plugin-sprite.svg?branch=master)](https://travis-ci.org/linjinying/rollup-plugin-sprite)
[![NPM version](https://img.shields.io/npm/v/rollup-plugin-sprite.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-sprite)
[![Coverage Status](https://coveralls.io/repos/github/linjinying/rollup-plugin-sprite/badge.svg?branch=master)](https://coveralls.io/github/linjinying/rollup-plugin-sprite?branch=master)

## installation

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
	    format: "scss",
	    spritesmithOptions:{
	        padding:5
	    }
    })
  ],
  dest: "bundle.js"
};
```

## License

Released under the [MIT license](./LICENSE).
