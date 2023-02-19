const path = require("path")
const getBaseUrl = require('./utils/getBaseUrl')
const processConfigPaths = require("./utils/processConfigPaths")

function fetchPaths(node, options, getFilename) {
  const baseUrl = getBaseUrl()
  const importSource = node.source.value
  // get the absolute path of the file being linted
  const filename = getFilename()
  const absoluteImportPath = path.normalize(
    path.join(path.dirname(filename), importSource)
  )
  const expectedPath = path.relative(baseUrl, absoluteImportPath).replaceAll('\\', '/')
  const ruleOptions = options[0] || {}
  const { autoFetchPaths = false } = ruleOptions
  const { deprecatedPaths = [], newPaths = [] } = autoFetchPaths ? processConfigPaths() : ruleOptions
  return {expectedPath, deprecatedPaths, newPaths}
}

module.exports = {
    meta: {
      fixable: "code"
    },
    create({ options, report, getFilename }) {
        
        return {
          ImportDeclaration(node) {
            const importSource = node.source.value
            if (importSource.startsWith(".")) {
              
              const {
                expectedPath, 
                deprecatedPaths, 
                newPaths
              } = fetchPaths(node, options, getFilename)
              let newPath = expectedPath
              
              const noNewPath = deprecatedPaths.every((depPath, index) => {
                if (expectedPath.includes(depPath)) {
                  newPath = newPath.replace(depPath, newPaths[index])
                  return false
                }
                return true
              })

              if (noNewPath) return

              report({
                node,
                message: `Alias imports are preferred.`,
                fix: function(fixer) {
                  return fixer.replaceText(node.source, `'${newPath}'`)
                }
              })
            }
          }
        }
      }
  }