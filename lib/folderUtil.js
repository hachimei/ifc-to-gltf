const fs = require('fs-extra')

function getFolderFiles (dirName = 'dist/gltfs') {
  let fileNameList
  fs.readdir(dirName)
    .then(files => {
      fileNameList = files
    })
    .catch(err => {
      console.log(err)
      fileNameList = []
    })
    console.log(fileNameList)
    return fileNameList
}

module.exports = {
  getFolderFiles: getFolderFiles
}
