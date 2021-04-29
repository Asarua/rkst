import { Methods } from './methods';
import { ConfigureRkst } from './index';
declare type Method = keyof typeof Methods;
export interface RkstConfig {
    methods: Method | Lowercase<Method>;
    url: string;
    body?: any;
    headers?: Record<string, string | number>;
    timeOut?: number;
    allowCode?: number | Array<number>;
    withCredentials?: boolean;
    baseUrl?: string;
}
export interface RkstResponse<Data> {
    code: number;
    msg: string;
    data: Data;
}
interface Rkst {
    <Response = any>(config: RkstConfig, before?: ConfigureRkst['before'], after?: ConfigureRkst['after']): Promise<Response>;
    get<GetResponse = any>(url: string, headers?: RkstConfig['headers']): Promise<GetResponse>;
    post<PostResponse = any>(url: string, body?: any, headers?: RkstConfig['headers']): Promise<PostResponse>;
    put<PutResponse = any>(url: string, body?: any, headers?: RkstConfig['headers']): Promise<PutResponse>;
    delete<DeleteResponse = any>(url: string, body?: any, headers?: RkstConfig['headers']): Promise<DeleteResponse>;
}
export declare const rkst: Rkst;
export {};
