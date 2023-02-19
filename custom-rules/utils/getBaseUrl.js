const fs = require("fs")
const path = require("path")
const findDirWithFile = require('./findDirWithFile')

module.exports = function getBaseUrl() {
  const baseDir = findDirWithFile("package.json")
  let url = ""
  const options = ["jsconfig.json", "tsconfig.json"]
  // tsconfig.json will override jsconfig.json
  options.forEach(filename => {
    const fpath = path.join(baseDir, filename)
    if (fs.existsSync(fpath)) {
      const config = JSON.parse(fs.readFileSync(fpath, 'utf8'))
      if (config && config.compilerOptions && config.compilerOptions.baseUrl) {
        url = config.compilerOptions.baseUrl
      }
    }
  })

  return path.join(baseDir, url)
}