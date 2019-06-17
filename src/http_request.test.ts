import assert from 'assert';
import HttpRequestUtil from './http_request';

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
      debug: boolean;
    }
  }
}

describe('http_request', () => {

  before(async () => {
    global.debug = true
  })

  it('get', async () => {
    try {
      const result1 = await HttpRequestUtil.get(`http://baidu.com`)
      // global.logger.error(result1)
      assert.strictEqual(result1[`data`].length > 10, true)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

