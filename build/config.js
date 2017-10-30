/**
 * Created by yangbing on 2017/10/30.
 */
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('../package.json').version;


const resolve = _path => path.resolve(__dirname,'../',_path);

const configs = {
    'umdDev':{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.js'),
        format:'umd',
        env:'development'
    },
    'umdProd':{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.min.js'),
        format:'umd',
        env:'production'
    },
    'commonjs':{
        input:resolve('src/index.js'),
        file:resolve('dist/vue-validate.common.js'),
        format:'cjs',
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
                buble()
            ]
        },
        output:{
            file:opts.file,
            format:opts.format,
            name:'vue-validate'
        }
    };
    if(opts.env){
        config.input.unshift(replace({
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

