// Utility functions library
const chalk = require('chalk');

function handleFatalError (err) {
  console.error(`${chalk.red('[Error fatal] =')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

module.exports = {
  handleFatalError
}