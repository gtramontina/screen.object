var wd = require('wd');
var path = require('path');
var workingDir = process.cwd();
var settings = require('./settings');

global.withScreen = function (screen, tests) { return function () {
  var capabilities = settings.capabilities;
  for (var capability in capabilities) {
    run(screen, capabilities[capability], tests);
  }
};};

function run (name, capability, tests) {
  var screen;
  beforeEach(function () {
    this.driver = screen.driver = wd.promiseChainRemote.apply(this, settings.remote);
    this.driver.init(capability);
  });

  after(function () { this.driver.close(); });
  tests.call(this, screen = screenFactory(name));
}

function screenFactory (name) {
  var screen = require(path.join(workingDir, settings.screensDir, name));
  screen.screen = screenFactory;
  screen.driver = this.driver;
  return screen;
}