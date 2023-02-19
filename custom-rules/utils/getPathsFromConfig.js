const fs = require("fs")
const path = require("path")
const findDirWithFile = require('./findDirWithFile')

module.exports = function getPathsFromConfig() {
    const baseDir = findDirWithFile("package.json")
    const fpath = path.join(baseDir, "tsconfig.json")
    let pathsFromConfig = {}
    if (fs.existsSync(fpath)) {
        const config = JSON.parse(fs.readFileSync(fpath, 'utf8'))
        pathsFromConfig = config?.compilerOptions?.paths || {}
    }

    return pathsFromConfig
}