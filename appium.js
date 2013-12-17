var fs = require('fs');
var path = require('path');
var workingDir = process.cwd();

var opts = (function () { try {
  return fs.readFileSync(path.resolve(workingDir, 'test/appium.opts'), 'utf8')
  .trim().split(/\s+/);
} catch (e) { return []; }})();

var args = require('appium/lib/server/parser')().parseArgs(opts);
require('appium/lib/server/main').run(args);