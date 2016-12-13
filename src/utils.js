import fs from 'fs'
import Module from 'module'

export const listRequiredModules = (packageName) => {
  try {
    const module = new Module()

    const mainFilePath = Module._resolveFilename(packageName, {
      ...module, paths: Module._nodeModulePaths(process.cwd())
    })

    const mainFile = fs.readFileSync(mainFilePath, 'utf-8')
    const matches = mainFile.match(/\.\/([^']+)/g)

    return matches ? matches.map((item) => item.match(/\.\/([^']+)/)[1]) : []
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e
    }

    console.warn(e.message)

    return []
  }
}
