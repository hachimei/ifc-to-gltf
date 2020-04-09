const gltfPipeline = require('gltf-pipeline')
const fsExtra = require('fs-extra')
const gltfToGlb = gltfPipeline.gltfToGlb
const gltf = fsExtra.readJsonSync('dist/gltfs/f1.gltf')

function toGlb () { // 生成glb后 ，cesium加载不成功，报undefined
    gltfToGlb(gltf).then(function (results) {
    fsExtra.writeJson('F1.glb', results.glb).then(() => {
        console.log('end glb')
    })
  })
}

module.exports = {
  toGlb: toGlb
}
