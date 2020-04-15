const fs = require('fs-extra')

function getFolderFiles (dirName = 'dist/gltfs') {
  return new Promise((resolve, reject) => {
    fs.readdir(dirName)
      .then(files => {
        console.log('fileNameList:', files)
        resolve(files)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = {
  getFolderFiles: getFolderFiles
}
