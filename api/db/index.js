'use strict'

const debug = require('debug')('mysql:db:setup');
const chalk = require('chalk');
const db = require('./setup');

async function setup() {
  let result;

  const config = {
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USER || 'fullstack',
    password: process.env.DB_PASS || '_fullstack',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
    port: '3306',
    logging: s => debug(s),
    setup: true
  }

  console.log('Success!')
  await db(config).catch(handleFatalError)
  // console.log(result);
  console.log('saliendo');

  // return result;
  
  //   // comment when api starts
    // process.exit(0)
    
  // }


}

function handleFatalError (err) {
  console.error(`${chalk.red('[Error fatal] =')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
