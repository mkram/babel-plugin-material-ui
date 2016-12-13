import {assert} from "chai";
import {listRequiredModules} from "../src/utils";

describe('utils', () => {
  describe('listRequiredModules', () => {
    it('should map all modules from package', () => {
      const modules = listRequiredModules('material-ui')

      assert.isArray(modules)
      assert.isAtLeast(modules.length, 1)
    })

    it('should return empty object when package not installed', () => {
      const modules = listRequiredModules('foo-bar')

      assert.isArray(modules)
      assert.strictEqual(modules.length, 0)
    })

    it('should return empty object when can not parse package main file', () => {
      const modules = listRequiredModules('material-ui/LICENSE')

      assert.isArray(modules)
      assert.strictEqual(modules.length, 0)
    })

    it('should throw error when package name is not valid', () => {
      assert.throws(() => listRequiredModules(null))
    })
  })
})
