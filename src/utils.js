import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import Module from 'module'

export const createPackageMap = (packageName) => {
  try {
    const mainFilePath = Module._resolveFilename(packageName, _.assign({}, new Module(), {
      paths: Module._nodeModulePaths(process.cwd())
    }))

    const mainFile = fs.readFileSync(mainFilePath, 'utf-8')

    return mainFile
      .match(/\.\/([^']+)/g)
      .map((item) => item.match(/\.\/([^']+)/)[1])
      .reduce((acc, item) => {
        acc[path.basename(item)] = item

        return acc
      }, {})
  } catch (e) {
    console.error(e)

    return {}
  }
}
