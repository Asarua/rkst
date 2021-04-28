import { RkstConfig, rkst, RkstResponse } from './rkst'

export interface ConfigureRkst {
  before?(config: RkstConfig): RkstConfig;
  after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
  options?: RkstConfig
}

export function configureRkst(rkstConfig: ConfigureRkst = {}) {
  return function<ResponseData = any>(config: RkstConfig) {
    return rkst<ResponseData>(
      { ...(rkstConfig.options || {}), ...config },
      rkstConfig?.before,
      rkstConfig?.after
    )
  }
}

export default rkst
export {
  RkstConfig,
  RkstResponse
}
