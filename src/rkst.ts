import { Methods } from './methods'
import { ConfigureRkst } from './index'
import { defaultConfig } from './defaultConfig'
import { ContentType } from './contentType'
import { memorizedQueryString } from './utils'

type Method = keyof typeof Methods
export interface RkstConfig {
  methods: Method | Lowercase<Method>,
  url: string,
  body?: any,
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

interface Rkst {
  <Response = any>(
    config: RkstConfig,
    before?: ConfigureRkst['before'],
    after?: ConfigureRkst['after']
  ): Promise<Response>;
  get<GetResponse = any>(
    url: string,
    headers?: RkstConfig['headers']
  ): Promise<GetResponse>;
  post<PostResponse = any>(
    url: string,
    body?: any,
    headers?: RkstConfig['headers']
  ): Promise<PostResponse>;
  put<PutResponse = any>(
    url: string,
    body?: any,
    headers?: RkstConfig['headers']
  ): Promise<PutResponse>;
  delete<DeleteResponse = any>(
    url: string,
    body?: any,
    headers?: RkstConfig['headers']
  ): Promise<DeleteResponse>;
}

export const rkst: Rkst = (config, before, after) => {
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
        let data = JSON.parse(xhr.responseText)
        if (typeof after === 'function') {
          data = after<Response>(data)
        }
        operation(data)
      }
    }
  })
}

rkst.get = (url, headers = {}) => {
  return rkst({
    url,
    methods: 'get',
    headers
  })
}

rkst.post = (url, body = {}, headers = {}) => {
  return rkst({
    url,
    methods: 'post',
    body,
    headers
  })
}

rkst.put = (url, body = {}, headers = {}) => {
  return rkst({
    url,
    methods: 'post',
    body,
    headers
  })
}

rkst.delete = (url, body = {}, headers = {}) => {
  return rkst({
    url,
    methods: 'post',
    body,
    headers
  })
}

