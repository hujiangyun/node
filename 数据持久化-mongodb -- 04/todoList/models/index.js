const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'develpoment'
const conf = require(__dirname + '/../config/config.json')[env]
