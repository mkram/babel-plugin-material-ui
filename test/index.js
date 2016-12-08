import fs from "fs";
import glob from "glob";
import path from "path";
import {assert} from "chai";
import {transformFileSync, transform} from "babel-core";
import plugin from "../src/index";

const fixtures = path.join(__dirname, 'fixtures/*/')
const errorFixtures = path.join(__dirname, 'error-fixtures/*/')
const getTestName = testPath => path.basename(testPath).split('-').join(' ');

describe('babel-plugin-transform-module-cherry-pick', () => {
  describe('transform', () => {
    glob.sync(fixtures).forEach((testPath) => {
      const testName = getTestName(testPath)
      const actualPath = path.join(testPath, 'actual.js')
      const expectedPath = path.join(testPath, 'expected.js')

      it(`should ${testName}`, () => {
        const actual = transformFileSync(actualPath, {
          plugins: [plugin],
          babelrc: false,
        }).code

        const expected = fs.readFileSync(expectedPath, 'utf8')

        assert.strictEqual(actual.trim(), expected.trim())
      })
    })
  })

  describe('error handling', () => {
    glob.sync(errorFixtures).forEach((testPath) => {
      const testName = getTestName(testPath);
      const actualPath = path.join(testPath, 'actual.js');

      it(`should ${testName}`, () => {
        assert.throws(() => transformFileSync(actualPath, {
          plugins: [plugin],
        }));
      });
    })
  })
})
