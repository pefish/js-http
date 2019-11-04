import DesensitizeUtil from '@pefish/js-util-desensitize'
import request from 'request-promise-native'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

export interface RequestOpts { 
  headers?: {[x: string]: string}, 
  params?: {[x: string]: string},
  resolveWithFullResponse?: boolean,
  timeout?: number,
  json?: boolean,
  auth?: {
    username: string,
    password: string,
  },
}

interface RequestOpts1 { 
  method: string,
  url: string,
  headers?: {[x: string]: string}, 
  qs?: {[x: string]: string},
  body?: {[x: string]: any},
  formData?: {[x: string]: any},
  resolveWithFullResponse?: boolean,
  timeout?: number,
  json?: boolean,
  auth?: {
    username: string,
    password: string,
  },
  [x: string]: any,
}

/**
 * http请求工具类
 */
export default class HttpRequestUtil {

  static async request (opts: RequestOpts1): Promise<any> {
    delete opts.params
    global.logger.debug(`request：${opts.url}, opts: ${DesensitizeUtil.desensitizeObjectToString(opts)}`)
    const resp = await request({
      json: true,
      timeout: 10000,
      resolveWithFullResponse: false,
      ...opts,
    })
    global.logger.debug(`success: ${DesensitizeUtil.desensitizeObjectToString(!!opts.resolveWithFullResponse ? resp.body : resp)}`)
    return resp
  }

  static async get (url: string, opts?: RequestOpts): Promise<any> {
    return await this.request({
      url,
      method: `GET`,
      qs: (opts && opts.params) ? opts.params : {},
      ...opts,
    })
  }

  static async post (url: string, opts?: RequestOpts): Promise<any> {
    return await this.request({
      url,
      method: `POST`,
      body: (opts && opts.params) ? opts.params : {},
      ...opts,
    })
  }

  static async postFormData (url: string, opts?: RequestOpts): Promise<any> {
    return await this.request({
      url,
      method: `POST`,
      formData: (opts && opts.params) ? opts.params : {},
      ...opts,
    })
  }
}
