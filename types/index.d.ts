import { RkstConfig, rkst, RkstResponse } from './rkst';
export interface ConfigureRkst {
    before?(config: RkstConfig): RkstConfig;
    after?<Response>(config: RkstResponse<Response>): RkstResponse<Response>;
}
export declare function configureRkst(rkstConfig?: ConfigureRkst): <Response_1 = any>(config: RkstConfig) => Promise<RkstResponse<Response_1>>;
export default rkst;
export { RkstConfig, RkstResponse };
