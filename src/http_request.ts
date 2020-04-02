import DesensitizeUtil from '@pefish/js-util-desensitize'
import request from 'request-promise-native'

export interface RequestOpts { 
  headers?: {[x: string]: string}, 
  params?: {[x: string]: any},
  resolveWithFullResponse?: boolean,  // 是否返回整个response，如果是false，则非200会抛错，200只返回body
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


function getGlobal (): any { 
  // @ts-ignore
  if (typeof self !== 'undefined') { return self; } 
  // @ts-ignore
  if (typeof window !== 'undefined') { return window; } 
  // @ts-ignore
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}

function getLogger (): any {
  return getGlobal().logger || console
}

/**
 * http请求工具类
 */
export default class HttpRequestUtil {

  static async request (opts: RequestOpts1): Promise<any> {
    delete opts.params
    getLogger().debug(`request：${opts.url}, opts: ${DesensitizeUtil.desensitizeObjectToString(opts)}`)
    const resp = await request({
      json: true,
      timeout: 10000,
      ...opts,
      resolveWithFullResponse: true,
    })
    getLogger().debug(`success: ${DesensitizeUtil.desensitizeObjectToString(resp.body || ``)}`)
    if (!!opts.resolveWithFullResponse) {
      return resp
    }
    if (resp.statusCode !== 200) {
      throw new Error(resp.statusMessage)
    }
    return resp.body
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
