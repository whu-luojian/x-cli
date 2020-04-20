#!/usr/bin/env node

const request = require('request')
const chalk = require('chalk')
const checkVersion = require('../lib/check-version')

console.log()
process.on('exit', () => {
  console.log()
})


checkVersion(() => {
  request({
    url: 'https://api.github.com/users/whu-luojian/repos',
    headers: {
      'User-Agent': 'x-cli'
    }
  }, (err, res, body) => {
    if (err) {
      console.error(chalk.red(err.message.trim()))
      process.exit(1)
    }
    const requestBody = JSON.parse(body)
    if (Array.isArray(requestBody)) {
      console.log('  Available templates:')
      console.log()
      requestBody.filter(repo => repo.name.startsWith('template')).forEach(repo => {
        const name = repo.name.match(/(?<=template-).+/)[0]
        console.log(
          '  ' + chalk.yellow('★') +
          '  ' + chalk.blue(name) +
          ' - ' + repo.description)
      })
    } else {
      console.error(requestBody.message)
    }
  })
})
