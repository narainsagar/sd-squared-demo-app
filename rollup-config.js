// blog post ref: https://hackernoon.com/how-to-create-library-in-angular-2-and-publish-to-npm-from-scratch-f2b1272d6266
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';
import angular from 'rollup-plugin-angular';
const sass = require('node-sass');
import { minify } from 'uglify-es'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/build.js', // output a single application bundle,
    sourcemap: false,
    format: 'iife'
  },
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }

    // console.warn everything else
    console.warn(warning.message);
  },
  plugins: [
    angular({
      preprocessors: {
        template: template => template,
        style: scss => {
          let css;
          if (scss) {
            css = sass.renderSync({ data: scss }).css.toString();
          } else {
            css = '';
          }
          return css;
        },
      }
    }),
    typescript({
      typescript: require('typescript')
    }),
    nodeResolve({ jsnext: true, module: true }),
    commonjs(/*{
      include: 'node_modules/**'
    }*/),
    uglify(/*{
      output: {
        comments: function (node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text);
          }
        }
      }
    }*/{
        toplevel: true,
        mangle: {
          toplevel: true,
        },
        compress: {
          dead_code: true,
          if_return: true,
          reduce_vars: true,
          drop_console: true,
        },
        output: {
          beautify: false,
        }
      }, minify)
  ]
};