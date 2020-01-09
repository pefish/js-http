import assert from 'assert';
import HttpRequestUtil from './http_request';

describe('http_request', () => {

  before(async () => {
    
  })

  it('get', async () => {
    try {
      const result1 = await HttpRequestUtil.get(`http://baidu.com`)
      // console.error(result1)
      assert.strictEqual(result1.length > 10, true)
    } catch (err) {
      console.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('post', async () => {
    try {
      const result1 = await HttpRequestUtil.post(`http://baidu.com`, {
        params: {
          token: `jsgs`,
        }
      })
      // console.error(result1)
      assert.strictEqual(result1.length > 10, true)
    } catch (err) {
      console.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('request', async () => {
    try {
      const result1 = await HttpRequestUtil.post(`http://baidu.com`, {
        params: {
          token: `jsgs`,
        },
        auth: {
          username: `123`,
          password: `111`,
        }
      })
      // console.error(result1)
      assert.strictEqual(result1.length > 10, true)
    } catch (err) {
      console.error(err)
      assert.throws(() => {}, err)
    }
  })
})

