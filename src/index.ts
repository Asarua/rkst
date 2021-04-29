import { RkstConfig, rkst, RkstResponse } from './rkst'
import { ContentType } from './contentType'
import { Methods } from './methods'

export interface ConfigureRkst {
  before?(config: RkstConfig): RkstConfig;
  after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
  options?: Partial<RkstConfig>
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
  RkstResponse,
  ContentType,
  Methods
}
