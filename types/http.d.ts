export interface RequestOpts {
    headers?: {
        [x: string]: string;
    };
    params?: {
        [x: string]: any;
    };
    body?: {
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
/**
 * http请求工具类
 */
export default class HttpUtil {
    private static request;
    static get(url: string, opts?: RequestOpts): Promise<any>;
    static post(url: string, opts?: RequestOpts): Promise<any>;
    static postFormData(url: string, opts?: RequestOpts): Promise<any>;
}
