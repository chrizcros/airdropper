import { pickNRandom } from './array'

describe('utils/array', () => {
  describe('.pickNRandom', () => {
    it('picks n random list entries', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      const result = pickNRandom(arr, 4)
      expect(result.length).toBe(4)
    })
  })
})
