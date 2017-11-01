/**
 * Created by yangbing on 2017/10/30.
 */
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');
const version = process.env.VERSION || require('../package.json').version;
const banner =
    `/**
 * vue-validate v${version}
 * (c) ${new Date().getFullYear()} Bingo Yang
 * @license MIT
 */`;


const resolve = _path => path.resolve(__dirname,'../',_path);

const configs = {
    umdDev:{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.js'),
        format:'umd',
        env:'development'
    },
    umdProd:{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.min.js'),
        format:'umd',
        env:'production'
    },
    commonjs:{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.common.js'),
        format:'cjs',
    },
    esm: {
        input: resolve('src/index.esm.js'),
        file: resolve('dist/vue-validate.esm.js'),
        format: 'es'
    }
};

function getConfig(opts) {
    let config = {
        input:{
            input:opts.input,
            plugins:[
                replace({
                    __VERSION__:version
                }),
                buble(),
                // babel({
                //     exclude: path.resolve(__dirname, "../node_modules")
                // })
            ]
        },
        output:{
            file:opts.file,
            format:opts.format,
            name:'vue-validate',
            banner
        }
    };
    if(opts.env){
        config.input.plugins.unshift(replace({
            'process.env.NODE_ENV':JSON.stringify(opts.env)
        }))
    }
    return config
}

function mapConfig(opt, fn) {
    let res = {};
    Object.keys(opt).forEach((key)=>{
        res[key] = fn(opt[key])
    });
    return res;
}

module.exports = mapConfig(configs,getConfig);

