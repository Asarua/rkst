import { RkstConfig, rkst, RkstResponse } from './rkst';
export interface ConfigureRkst {
    before?(config: RkstConfig): RkstConfig;
    after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
    options?: RkstConfig;
}
export declare function configureRkst(rkstConfig?: ConfigureRkst): <ResponseData = any>(config: RkstConfig) => Promise<ResponseData>;
export default rkst;
export { RkstConfig, RkstResponse };
