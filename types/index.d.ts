import { RkstConfig, rkst, RkstResponse } from './rkst';
import { ContentType } from './contentType';
import { Methods } from './methods';
export interface ConfigureRkst {
    before?(config: RkstConfig): RkstConfig;
    after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
    options?: Partial<RkstConfig>;
}
export declare function configureRkst(rkstConfig?: ConfigureRkst): <ResponseData = any>(config: RkstConfig) => Promise<ResponseData>;
export default rkst;
export { RkstConfig, RkstResponse, ContentType, Methods };
