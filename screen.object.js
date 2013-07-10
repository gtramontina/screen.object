var path = require('path');
var workingDir = process.cwd();

var settings;
try { settings = require(path.join(workingDir, 'drivers.settings')); }
catch (e) { throw new Error('\nCould not find "driver.settings.[js|json]".\n' +
'Please refer to the documentation on how to set scren.object up.\n'); }

settings.remote = settings.remote || [ 'localhost', 4723 ];
settings.screensDirectory = settings.screensDirectory || 'test/screen';

if (!settings.capabilities || !Object.keys(settings.capabilities).length)
  throw new Error('\nPlease setup at least one device.\n' +
  'Edit "drivers.settings" and add your device under the "capabilities" key.\n');

global.withScreen = function (screen, tests) { return function () {
  var capabilities = settings.capabilities;
  for (capability in capabilities) {
    run(screen, capabilities[capability], tests);
  }
};};

var wd = require('wd');
var run = function (name, capability, tests) {
  var screen;
  beforeEach(function () {
    this.driver = screen.driver = wd.remote.apply(this, settings.remote).chain();
    this.driver.init(capability);
  });

  after(function () { this.driver.close(); });
  tests.call(this, screen = screenFactory(name));
};

var screenFactory = function (name) {
  var screen = require(path.join(workingDir, settings.screensDirectory, name));
  screen.screen = screenFactory;
  screen.driver = this.driver;
  return screen;
};