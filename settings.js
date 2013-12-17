var settings;
var file = 'drivers.settings';
var defaults = {
  screensDir: 'test/screen',
  remote: [ 'localhost', 4732 ]
};

try { settings = require(path.join(workingDir, file)); }
catch (e) { throw new Error('\nCould not find "' + file + '.[js|json]".\n' +
'Please refer to the documentation on how to set screen.object up.\n'); }

if (!settings.capabilities || !Object.keys(settings.capabilities).length)
  throw new Error('\nPlease setup at least one device.\nEdit "' + file +
  '" and add your device under the "capabilities" key.\n');

settings.remote = settings.remote || defaults.remote;
settings.screensDir = settings.screensDir || defaults.screensDir;

module.exports = settings;