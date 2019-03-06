'use strict'

const debug = require('debug')('shopmate:api:db');
const Sequelize = require('sequelize');
const defaults = require('defaults');

const settings = {
    db: {
      database: process.env.DB_NAME || 'shopmate',
      username: process.env.DB_USER || 'fullstack',
      password: process.env.DB_PASS || '_fullstack',
      host: process.env.DB_HOST || '',
      dialect: 'mysql',
      port: '3306',
      logging: s => debug(s)
    },
    session: {
      operatorsAliases: Sequelize.Op,
      define:{
        timestamps: false
      },
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      query: {
        raw: true
      }
    }
}

const config = defaults(settings.db, settings.session)

module.exports = config; 