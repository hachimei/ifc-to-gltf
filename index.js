#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const fs = require('fs-extra')

const files = require('./lib/files')
const folderUtil = require('./lib/folderUtil')
var toDracoUtil = require('./lib/toDraco')
var toGlbUtil = require('./lib/toGlb')

clear()

console.log(
  chalk.yellow(figlet.textSync('ifc-to-gltf', { horizontalLayout: 'full' }))
)

if (process.argv[2] == '-i') {
  if (process.argv[3] != '') {
    fs.ensureFile('./' + process.argv[3])
      .then(() => {
        files.clean()
        files.singleConvert(
          './' + process.argv[3],
          process.argv[4] ? process.argv[4] : 'f1'
        )
      })
      .catch(err => {
        console.log(chalk.red(err))
      })
  }
} else if (process.argv[2] == 'clean') {
  files.clean()
} else if (process.argv[2] == 'group') {
  files.clean()

  let list = ['f1', 'f2', 'f3']
  files.groupConvert('./ifc/', list)
} else if (process.argv[2] == 'draco') {
  console.log(chalk.green('to darco...'))
  let fileNameList = folderUtil.getFolderFiles('dist/gltfs')
  toDracoUtil.toDraco(fileNameList)
} else if (process.argv[2] == 'glb') {
  console.log(chalk.green('to glb...'))
  toGlbUtil.toGlb()
} else {
  console.log(chalk.red('Please pass a file!'))
}
