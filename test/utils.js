import {assert} from "chai";
import {createPackageMap} from "../src/utils";

describe('utils', () => {
  describe('createPackageMap', () => {
    it('should map all modules from package', () => {
      const packageMap = createPackageMap('material-ui')

      assert.isObject(packageMap)
      assert.isAtLeast(Object.keys(packageMap).length, 1)
    })

    it('should return empty object when package not installed', () => {
      const packageMap = createPackageMap('foo-bar')

      assert.isObject(packageMap)
      assert.strictEqual(Object.keys(packageMap).length, 0)
    })
  })
})
