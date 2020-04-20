#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const exists = require('fs').existsSync
const home = require('user-home')
const inquirer = require('inquirer')
const ora = require('ora')
const rm = require('rimraf').sync
const download = require('download-git-repo')
const generate = require('../lib/generate')
const checkVersion = require('../lib/check-version')

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')

/**
 * Help.
 */

program.on('--help', () => {
  console.log()
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with a template'))
  console.log('    $ x init vue-component my-project')
  console.log()
})

/**
 * Help.
 */

function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()

/**
 * Settings.
 */

const templateName = program.args[0] // 模板名
const rawName = program.args[1] // 项目名
const inPlace = !rawName || rawName === '.' // 是否在当前文件夹下创建
const projectName = inPlace ? path.relative('../', process.cwd()) : rawName // 项目名
const to = path.resolve(rawName || '.') // 目标文件路径
const tmp = path.join(home, '.x-templates', templateName.replace(/[\/:]/g, '-')) // 模板临时文件夹

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

if (inPlace || exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      run()
    }
  }).catch((err) => {
    console.error(chalk.red(err.message.trim()))
    process.exit(1)
  })
} else {
  run()
}

/**
 * Check, download and generate the project.
 */

function run () {
  const templateUrl = 'github:whu-luojian/template-' + templateName
  checkVersion(() => {
    downloadAndGenerate(templateUrl)
  })
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} templateUrl
 */

function downloadAndGenerate (templateUrl) {
  const spinner = ora('downloading template')
  spinner.start()
  // Remove if local template exists
  if (exists(tmp)) rm(tmp)
  download(templateUrl, tmp, { clone: true }, err => {
    spinner.stop()
    if (err) {
      console.error(chalk.red('Failed to download repo ' + templateUrl + ': ' + err.message.trim()))
      process.exit(1)
    }
    generate(projectName, tmp, to, err => {
      if (err) {
        console.error(chalk.red(err.message.trim()))
        process.exit(1)
      }
      console.log()
      console.log(chalk.green('Generated "%s".', projectName))
    })
  })
}
