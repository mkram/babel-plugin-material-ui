import fs from 'fs'
import path from 'path'
import Module from 'module'

export const createPackageMap = (packageName) => {
  try {
    const module = new Module()

    const mainFilePath = Module._resolveFilename(packageName, {
      ...module, paths: Module._nodeModulePaths(process.cwd())
    })

    const mainFile = fs.readFileSync(mainFilePath, 'utf-8')

    return mainFile
      .match(/\.\/([^']+)/g)
      .map((item) => item.match(/\.\/([^']+)/)[1])
      .reduce((acc, item) => {
        acc[path.basename(item)] = item

        return acc
      }, {})
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.warn(e.message)

      return {}
    }

    throw e
  }
}
