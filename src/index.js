import _ from 'lodash'
import path from 'path'
import {listRequiredModules} from './utils'

const rootModuleName = 'material-ui'
const rootModules = _.keyBy(listRequiredModules(rootModuleName), (item) => path.basename(item))

const iconsModuleName = 'material-ui/svg-icons'
const iconModules = _.keyBy(listRequiredModules(iconsModuleName), _.flow(_.camelCase, _.upperFirst))

const createTransformerSettings = (sourceValue) => {
  switch (sourceValue) {
    case rootModuleName:
      return {
        index: rootModuleName,
        modules: rootModules,
      }
    case iconsModuleName:
      return {
        index: iconsModuleName,
        modules: iconModules
      }
    default:
      return null
  }
}

export default function ({types}) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (!path.node.specifiers.length) {
          return
        }

        const settings = createTransformerSettings(path.node.source.value)

        if (!settings) {
          return
        }

        const specifiers = path.node.specifiers.filter((spec) => types.isImportSpecifier(spec))

        if (specifiers.length < path.node.specifiers.length) {
          return
        }

        specifiers.forEach((spec) => {
          const {name} = spec.imported
          const modulePath = settings.modules[name]

          if (!modulePath) {
            throw new Error(`${settings.index} does not contain module "${name}"`)
          }

          const specifiers = [types.importDefaultSpecifier(types.identifier(spec.local.name))]

          path.insertBefore(types.importDeclaration(specifiers, types.stringLiteral(`${settings.index}/${modulePath}`)))
        })

        path.remove()
      }
    },
  }
}


