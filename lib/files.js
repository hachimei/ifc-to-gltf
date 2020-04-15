const fs = require('fs-extra')
const obj2gltf = require('obj2gltf')
const baseUrl = './dist/'
const gltfUrl = './dist/gltfs/'
const sourceUrl = './ifc/'
const chalk = require('chalk')

var ifcConvert = require('ifc-convert')

function groupConvert (fileBasePath, fileNameList = []) {
  if (!fileNameList.length) {
    console.log(chalk.green('group convert end!'))
    return
  }

  let fileName = fileNameList.shift().split('.')[0]
  fs.ensureDir('dist').then(() => {
    console.log(chalk.green(fileBasePath + fileName + '.ifc' + ' starting...'))
    ifcConvert(
      fileBasePath + fileName + '.ifc',
      fileName ? baseUrl + fileName + '.obj' : 'dest.obj',
      { path: './lib' }
    )
      .then(() => {
        obj2gltf(fileName ? baseUrl + fileName + '.obj' : 'dest.obj') // , { binary : true })
          .then(function (gltf) {
            const data = Buffer.from(JSON.stringify(gltf))

            fs.ensureFileSync(gltfUrl + fileName + '.gltf', data)
            fs.outputFile(gltfUrl + fileName + '.gltf', data)
              .then(() => {
                console.log(chalk.green(fileName + ' success!'))
                groupConvert(fileBasePath, fileNameList)
              })
              .catch(err => {
                console.log(chalk.red(err))
              })
          })
      })
      .catch(err => {
        // console.log('Please install IfcConvert! \n')
        console.log(chalk.red(err))
      })
  })
}

module.exports = {
  clean: () => {
    fs.removeSync('dist')
    console.log(chalk.green('clean prodution files!!!'))
  },
  groupConvert: groupConvert,
  singleConvert: (filePath, fileName) => {
    console.log(chalk.green(baseUrl + fileName + ' starting'))
    fs.ensureDir('dist').then(() => {
      ifcConvert(
        filePath,
        fileName ? baseUrl + fileName + '.obj' : 'dest.obj',
        { path: './lib' }
      )
        .then(() => {
          obj2gltf(fileName ? baseUrl + fileName + '.obj' : 'dest.obj') // , { binary : true })
            .then(function (gltf) {
              const data = Buffer.from(JSON.stringify(gltf))

              fs.ensureDirSync(gltfUrl)
              fs.outputFile(gltfUrl + fileName + '.gltf', data)
                .then(() => {
                  console.log(chalk.green('success!'))
                })
                .catch(err => {
                  console.log(chalk.green(err))
                })
            })
        })
        .catch(err => {
          // console.log('Please install IfcConvert! \n')
          console.log(chalk.red(err))
        })
    })
  }
}
