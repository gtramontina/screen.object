screen.object
=============

[![Dependency Status](https://gemnasium.com/gtramontina/screen.object.png)](https://gemnasium.com/gtramontina/screen.object)
[![NPM version](https://badge.fury.io/js/screen.object.png)](http://badge.fury.io/js/screen.object)

[Page Object Pattern](https://code.google.com/p/selenium/wiki/PageObjects) for [Appium](https://github.com/appium/appium) and [Mocha](https://github.com/visionmedia/mocha).

## Configuration

___It can be a bit complicated to explain, so please take a look at the example (todo) to have a better idea of how to set everything up.___

- Add a file called `drivers.settings.js` to your project root and configure it based on this example:

```javascript
module.exports = {
  // DEFAULT
  screensDirectory: 'test/screen',

  // DEFAULT
  remote          : ['localhost', 4723 ],

  // REQUIRED!
  capabilities    : {
    ios           : {
      device      : 'iPhone Simulator',
      app         : require('path').resolve(__dirname, 'build', 'my.app')
    }
  }
};
```

- Create a directory to hold your screen objects under `test/screen`.
- Require `screen.object` in your mocha options. If you are using `mocha.opts` you can just add `--require screen.object` to it.
- Write your Mocha `describe`s as the following example and you'll have the screens required from your screen directory.

```javascript
describe('Home', withScreen('HomeScreen', function(screen) {
  ...
}));
```

### Running the Appium server automatically

If you want `screen.object` to run the Appium server automatically, you can `--require screen.object/appium` in your mocha options. And just like `mocha.opts` you can specify a `appium.opts` under your `test` directory with the options you want your server to start with.

## License

This is licensed under the feel-free-to-do-whatever-you-want-to-do license.