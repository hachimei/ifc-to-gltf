const gltfPipeline = require('gltf-pipeline')
const fsExtra = require('fs-extra')
const gltfToGlb = gltfPipeline.gltfToGlb

function toGlb () { // 生成glb后 ，cesium加载不成功，报undefined
    const gltf = fsExtra.readJsonSync('dist/gltfs/f1.gltf')
    gltfToGlb(gltf).then(function (results) {
    fsExtra.writeJson('F1.glb', results.glb).then(() => {
        console.log('end glb')
    })
  })
}

module.exports = {
  toGlb: toGlb
}
