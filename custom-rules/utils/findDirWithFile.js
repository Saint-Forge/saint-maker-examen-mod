const fs = require("fs")
const path = require("path")

module.exports = function findDirWithFile(filename) {
  // start at our CWD and traverse upwards until we either hit the root "/" or find a directory with our file
  let dir = path.resolve(filename)
  do {
    dir = path.dirname(dir)
  } while (!fs.existsSync(path.join(dir, filename)) && dir !== "/")

  if (!fs.existsSync(path.join(dir, filename))) {
    return
  }

  return dir
}
