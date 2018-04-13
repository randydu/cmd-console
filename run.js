'use strict'

/**
 * Example how to combine both packages to run a console.
 */

const cmdlet = require('../cmdlets');
const cmd_console = require('./index.js')(cmdlet);

cmd_console.run();
