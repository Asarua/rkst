import { RkstConfig, rkst, RkstResponse } from './rkst'

export interface ConfigureRkst {
  before?(config: RkstConfig): RkstConfig;
  after?<Response>(config: RkstResponse<Response>): RkstResponse<Response>;
}

export function configureRkst(rkstConfig: ConfigureRkst = {}) {
  return function<Response = any>(config: RkstConfig) {
    return rkst<Response>(config, rkstConfig?.before, rkstConfig?.after)
  }
}

export default rkst
export {
  RkstConfig,
  RkstResponse
}
