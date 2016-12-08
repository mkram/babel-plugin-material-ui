import {createPackageMap} from './utils'

const packageName = 'material-ui'
const pkg = createPackageMap(packageName)

export default function ({types}) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value !== packageName || !path.node.specifiers.length) {
          return
        }

        const importSpecifiers = path.node.specifiers.filter((spec) => types.isImportSpecifier(spec))

        if (importSpecifiers.length < path.node.specifiers.length) {
          return
        }

        importSpecifiers.forEach((spec) => {
          const {name} = spec.imported
          const modulePath = pkg[name]

          if (!modulePath) {
            throw new Error(`${packageName} does not contain module "${name}"`)
          }

          const specifiers = [types.importDefaultSpecifier(types.identifier(spec.local.name))]

          path.insertBefore(types.importDeclaration(specifiers, types.stringLiteral(`${packageName}/${modulePath}`)))
        })

        path.remove()
      }
    },
  }
}


