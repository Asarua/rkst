import { RkstConfig, rkst, RkstResponse } from './rkst'
import { ContentType } from './contentType'
import { Methods } from './methods'

export interface ConfigureRkst {
  before?(config: RkstConfig): RkstConfig;
  after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
  options?: Partial<RkstConfig>
}

export function configureRkst(rkstConfig: ConfigureRkst = {}) {

  const baseUrl = rkstConfig.options?.baseUrl || ''
  function wrapper<ResponseData = any>(config: RkstConfig) {
    return rkst<ResponseData>(
      { ...(rkstConfig.options || {}), ...config },
      rkstConfig?.before,
      rkstConfig?.after
    )
  }

  wrapper.get = <T>(url: string, headers: RkstConfig['headers']) =>
    rkst.get<T>(baseUrl + url, headers)

  wrapper.post = <R>(url: string, body: any, headers: RkstConfig['headers']) => {
    return rkst.post<R>(
      baseUrl + url,
      body,
      headers
    )
  }

  return wrapper
}

export default rkst
export {
  RkstConfig,
  RkstResponse,
  ContentType,
  Methods
}
