const getPathsFromConfig = require('./getPathsFromConfig')

module.exports = function processConfigPaths() {
    const allPaths = getPathsFromConfig()
    const result = Object.entries(allPaths).reduce(function (iterator, currentValue) {
        const newPath = currentValue[0].replaceAll('*', '')
        const deprecatedPath = currentValue[1][0].replaceAll('*', '')
        iterator.newPaths.push(newPath)
        iterator.deprecatedPaths.push(deprecatedPath)
        return iterator
    }, { newPaths: [], deprecatedPaths: [] })
    newPaths = result.newPaths
    deprecatedPaths = result.deprecatedPaths

    return { newPaths, deprecatedPaths }
}