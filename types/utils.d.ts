import { RkstResponse } from './rkst';
export declare const memorizedGetConnectChar: (url: string) => any;
export declare const memorizedQueryString: (url: string, data?: {} | undefined) => string;
/**
 * @description 记忆化函数
 */
export declare function memorize<F extends (...args: unknown[]) => unknown>(fn: F): (...args: Parameters<F>) => ReturnType<F>;
export declare const NOOP: () => void;
export declare function createResponse<Response = any>(xhr: XMLHttpRequest, isAllow: boolean): RkstResponse<Response>;
