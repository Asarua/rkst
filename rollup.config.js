import path from 'path'
import resolve from 'rollup-plugin-node-resolve' // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import packageJSON from './package.json'

const getPath = _path => path.resolve(__dirname, _path)
const extensions = [
  '.js',
  '.ts'
]

// 基础配置
const commonConf = {
  input: getPath('./src/index.ts'),
  // TODO 如果是npm包，可以使用external来进行优化，否则需要将其打包进去
  // external: ['md5'],
  // globals: {
  //   md5: 'md5'
  // },
  plugins:[
    resolve(extensions),
    commonjs(),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    })
  ]
}

const plugins = [terser({
  format: {
    comments: false
  }
})]

// 需要导出的模块类型
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
    plugins
  },
  {
    file: packageJSON.module, // es6模块
    format: 'es',
    plugins
  }
]

const buildConf = options => Object.assign({}, commonConf, options)
export default outputMap.map(output => buildConf(
  {
    output: {
      name: packageJSON.name,
      ...output
    }
  }
))
