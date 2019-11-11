export interface RequestOpts {
    headers?: {
        [x: string]: string;
    };
    params?: {
        [x: string]: any;
    };
    resolveWithFullResponse?: boolean;
    timeout?: number;
    json?: boolean;
    auth?: {
        username: string;
        password: string;
    };
}
interface RequestOpts1 {
    method: string;
    url: string;
    headers?: {
        [x: string]: string;
    };
    qs?: {
        [x: string]: string;
    };
    body?: {
        [x: string]: any;
    };
    formData?: {
        [x: string]: any;
    };
    resolveWithFullResponse?: boolean;
    timeout?: number;
    json?: boolean;
    auth?: {
        username: string;
        password: string;
    };
    [x: string]: any;
}
/**
 * http请求工具类
 */
export default class HttpRequestUtil {
    static request(opts: RequestOpts1): Promise<any>;
    static get(url: string, opts?: RequestOpts): Promise<any>;
    static post(url: string, opts?: RequestOpts): Promise<any>;
    static postFormData(url: string, opts?: RequestOpts): Promise<any>;
}
export {};
