import { RkstResponse } from './rkst'

export const memorizedGetConnectChar = memorize(getConnectChar)
export const memorizedQueryString = memorize(queryString)

/**
 * @description 记忆化函数
 */
export function memorize<
  F extends (...args: unknown[]) => unknown
>(fn: F): (...args: Parameters<F>) => ReturnType<F> {
  const cache = {}
  function memo(...args) {
    const argsStr = JSON.stringify(Array.from(args))
    const val = cache[argsStr]
    return val || (cache[argsStr] = fn(...args))
  }
  memo.cache = cache
  return memo
}

/**
 * @description 获取用于拼接的字符
 */
function getConnectChar<S extends string>(
  url: S
): S extends `${any}?${any}` ? '&' : '?' {
	return url.includes('?') ? '&' : '?' as any
}

/**
 * @description 拼接字符串与对象
 */
function queryString<S extends string>(url: S, data = {}): string {
	return Reflect.ownKeys(data).reduce((url: string, item: string) => {
		return `${url}${memorizedGetConnectChar(url)}${item}=${Reflect.get(data, item)}`
	}, url || '') as any
}

export const NOOP = () => {}

export function createResponse<Response = any>(
  xhr: XMLHttpRequest,
  isAllow: boolean
): RkstResponse<Response> {
  return {
    code: xhr.status,
    msg: isAllow ? '请求成功！' : '请求失败！',
    data: JSON.parse(xhr.responseText)
  }
}
