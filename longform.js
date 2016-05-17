#!/usr/bin/env node
const cli = require('cli');
const Promise = require('bluebird');
const options = cli.parse();
const dotenv = require('dotenv').config();

require('./lib/steps/initialize')()
    .then(require('./lib/steps/listExistingFilenames'))
    .then(require('./lib/steps/displayExistingSettings'))
    .then(require('./lib/steps/fetchDataFromHive'))
    .then(require('./lib/steps/getHeadersFromData'))
    .then(require('./lib/steps/compileDataIntoHTML'))
    .then(require('./lib/steps/outputHTML'))
    .then(require('./lib/steps/success'))
    .catch((err) => cli.error(err));
