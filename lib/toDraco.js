const gltfPipeline = require('gltf-pipeline')
const fsExtra = require('fs-extra')


const processGltf = gltfPipeline.processGltf


const options = {
  dracoOptions: {
    compressionLevel: 10
  }
}

function toDraco (fileNameList = []) {
  if(!fileNameList.length) return
  let fileName = fileNameList.shift()
  let gltf = fsExtra.readJsonSync('dist/gltfs/' + fileName)
  console.log(fileName + 'draco start!')
  processGltf(gltf, options).then(function (results) {
    fsExtra.writeJson('./draco/' + fileName.split('.')[0] + '-draco.gltf', results.gltf).then(() => {
      console.log(fileName + 'draco end!')
    })
  })
}

module.exports = {
  toDraco: toDraco
}
