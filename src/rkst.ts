import { Methods } from './methods'
import { ConfigureRkst } from './index'
import { defaultConfig } from './defaultConfig'
import { ContentType } from './contentType'
import { memorizedQueryString } from './utils'

type Method = keyof typeof Methods
export interface RkstConfig {
  methods: Method | Lowercase<Method>,
  url: string,
  body?: BodyInit,
  headers?: Record<string, string | number>,
  timeOut?: number,
  allowCode?: number | Array<number>,
  withCredentials?: boolean,
  baseUrl?: string
}

export interface RkstResponse<Data> {
  code: number;
  msg: string;
  data: Data;
}

export function rkst<Response = any>(
  config: RkstConfig,
  before?: ConfigureRkst['before'],
  after?: ConfigureRkst['after']
): Promise<Response> {
  let options = config
  if (typeof before === 'function') {
    options = Object.assign({}, before(options))
  }
  options = Object.assign({}, defaultConfig, options)

  if (!options.url?.includes('//') && options?.baseUrl) {
    options.url = options.baseUrl + options.url
  }

  if (options.headers?.['Content-Type'] === ContentType.URL_ENCODED) {
    options.url = memorizedQueryString(options.url, options.body)
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.timeout = options.timeOut || 10000
    xhr.withCredentials = options.withCredentials || false
    xhr.open(options.methods, options.url)
    Object.keys(options.headers || {}).forEach(item => {
      xhr.setRequestHeader(item, Reflect.get(options.headers || {}, item))
    })
    xhr.send(JSON.stringify(options.body))
    xhr.onreadystatechange = function() {
      const allowCodes = [options.allowCode].flat(Infinity)
      if (xhr.readyState === 4) {
        const isAllow = allowCodes.some(code => code === xhr.status)
        const operation = isAllow ? resolve : reject
        let data: Response = JSON.parse(xhr.responseText)
        if (typeof after === 'function') {
          data = after<Response>(data)
        }
        operation(data)
      }
    }
  })
}
