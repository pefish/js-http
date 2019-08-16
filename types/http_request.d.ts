declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
        }
    }
}
/**
 * http请求工具类
 */
export default class HttpRequestUtil {
    static get(url: string, headers?: object, params?: object): Promise<any>;
    static getJson(url: string, headers?: object, params?: object): Promise<any>;
    static post(url: string, headers?: object, params?: object): Promise<any>;
    static postJson(url: string, headers?: object, params?: object): Promise<any>;
    static postFormData(url: string, headers?: object, params?: object): Promise<any>;
    static getJsonByAuth(url: string, username: string, password: string, headers?: object, params?: object): Promise<any>;
    static postJsonByAuth(url: string, username: string, password: string, headers?: object, params?: object): Promise<any>;
}
