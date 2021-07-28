import { RkstConfig, rkst, RkstResponse } from './rkst';
import { ContentType } from './contentType';
import { Methods } from './methods';
export interface ConfigureRkst {
    before?(config: RkstConfig): RkstConfig;
    after?<ConfigureResponse = any>(config: ConfigureResponse): ConfigureResponse;
    options?: Partial<RkstConfig>;
}
export declare function configureRkst(rkstConfig?: ConfigureRkst): {
    <ResponseData = any>(config: RkstConfig): Promise<ResponseData>;
    get<T>(url: string, headers: RkstConfig['headers']): Promise<T>;
    post<R>(url: string, body: any, headers: RkstConfig['headers']): Promise<R>;
};
export default rkst;
export { RkstConfig, RkstResponse, ContentType, Methods };
