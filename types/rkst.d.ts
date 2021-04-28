import { Methods } from './methods';
import { ConfigureRkst } from './index';
declare type Method = keyof typeof Methods;
export interface RkstConfig {
    methods: Method | Lowercase<Method>;
    url: string;
    body?: BodyInit;
    headers?: Record<string, string | number>;
    timeOut?: number;
    allowCode?: number | Array<number>;
    withCredentials?: boolean;
}
export interface RkstResponse<Data> {
    code: number;
    msg: string;
    data: Data;
}
export declare function rkst<Response = any>(config: RkstConfig, before?: ConfigureRkst['before'], after?: ConfigureRkst['after']): Promise<Response>;
export {};
