# rollup-plugin-sprite

Create a sprite sheet based on spritesmith for Rollup

[![NPM version](https://img.shields.io/npm/v/brick.js.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-sprite)

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