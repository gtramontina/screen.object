var workingDir = process.cwd();
var path = require('path');
var fs = require('fs');

var opts = (function () { try {
  return fs.readFileSync(path.resolve(workingDir, 'test/appium.opts'), 'utf8')
  .trim().split(/\s+/);
} catch (e) { return []; }})();

var args = require('appium/lib/server/parser')().parseArgs(opts);
args.log = args.log || path.resolve(workingDir, 'appium.log');
args.quiet = true;

require('appium/lib/server/main').run(args);