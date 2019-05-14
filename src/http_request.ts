import 'js-node-assist'
import request from 'restler'
import ErrorHelper from 'p-js-error'


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
  static get (url: string, headers: object = null, params: object = null): Promise<any> {
    if (params) {
      url = url + '?' + Object.entries(params).map(([key, val]) => {
        if (val) {
          return key + '=' + val
        }
      }).join('&')
    }
    return new Promise((resolve, reject) => {
      global[`debug`] && global.logger.info(`get访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.get(url, {
        timeout: 10000
      }).on('success', function (data, res) {
        resolve({
          data: data,
          res: res
        })
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static getJson (url: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (params) {
        url = url + '?' + Object.entries(params).map(([key, val]) => {
          if (val) {
            return key + '=' + val
          }
        }).join('&')
      }
      headers || (headers = {})
      headers['Content-Type'] = 'application/json; charset=utf-8'
      global[`debug`] && global.logger.info(`getJson访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.get(url, {
        timeout: 10000,
        headers: headers
      }).on('success', function (data, res) {
        global[`debug`] && global.logger.info(`success: ${JSON.stringify(data)}`)
        resolve(data)
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static post (url: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      global[`debug`] && global.logger.info(`post访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.post(url, {
        timeout: 10000,
        data: params || {},
        headers: headers
      }).on('success', function (data, res) {
        resolve({
          data: data,
          res: res
        })
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static postJson (url: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      headers || (headers = {})
      headers['Content-Type'] = 'application/json; charset=utf-8'
      global[`debug`] && global.logger.info(`postJson访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.postJson(url, params || {}, {
        timeout: 10000,
        headers: headers,
        parser: (data, callback) => {
          data = data.replace(/^\ufeff/i, '').replace(/^\ufffe/i, '')
          request.parsers.json(data, callback)
        }
      }).on('success', function (data, res) {
        global[`debug`] && global.logger.info(`success: ${JSON.stringify(data)}`)
        resolve(data)
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result, res) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static postFormData (url: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      headers || (headers = {})
      global[`debug`] && global.logger.info(`postFormData访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.post(url, {
        data: params || {}
      }, {
        timeout: 10000,
        headers: headers,
        parser: (data, callback) => {
          data = data.replace(/^\ufeff/i, '').replace(/^\ufffe/i, '')
          request.parsers.json(data, callback)
        }
      }).on('success', function (data, res) {
        global[`debug`] && global.logger.info(`success: ${JSON.stringify(data)}`)
        resolve(data)
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result, res) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static getJsonByAuth (url: string, username: string, password: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (params) {
        url = url + '?' + Object.entries(params).map(([key, val]) => {
          if (val) {
            return key + '=' + val
          }
        }).join('&')
      }
      headers || (headers = {})
      headers['Content-Type'] = 'application/json; charset=utf-8'
      global[`debug`] && global.logger.info(`getJsonByAuth访问：${url}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(params)}`)
      request.get(url, {
        timeout: 10000,
        headers: headers,
        username: username,
        password: password
      }).on('success', function (data, res) {
        global[`debug`] && global.logger.info(`success: ${JSON.stringify(data)}`)
        resolve(data)
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }

  static postJsonByAuth (url: string, username: string, password: string, headers: object = null, params: object = null): Promise<any> {
    return new Promise((resolve, reject) => {
      headers || (headers = {})
      headers['Content-Type'] = 'application/json; charset=utf-8'
      global[`debug`] && global.logger.info(`postJsonByAuth访问：${url}, body: ${JSON.stringify(params)}`)
      request.postJson(url, params || {}, {
        timeout: 10000,
        headers: headers,
        username: username,
        password: password
      }).on('success', function (data, res) {
        global[`debug`] && global.logger.info(`success: ${JSON.stringify(data)}`)
        resolve(data)
        this.abort()
      }).on('failed', (data, res) => {
        reject(new ErrorHelper(`${url}访问失败`, 0))
      }).on('error', (err, res) => {
        reject(new ErrorHelper(`${url}访问错误`, 0, null, err))
      }).on('timeout', (ms) => {
        reject(new ErrorHelper(`${url}访问超时`, 0))
      }).on('complete', function (result, res) {
        if (!this.aborted) {
          reject(new ErrorHelper(`${url} error. ${JSON.stringify(result)}`))
        }
      })
    })
  }
}