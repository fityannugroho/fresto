// Karma configuration
// Generated on Fri Jul 03 2020 20:15:52 GMT+0700 (Western Indonesia Time)

// Resolve a Chrome binary for headless testing. There is no system Chrome on CI,
// so fall back to the Chrome bundled with puppeteer (downloaded at install time).
// puppeteer 25+ exposes executablePath() as a promise, hence the child process.
if (!process.env.CHROME_BIN) {
  try {
    const { execFileSync } = require('child_process');
    const script = "require('puppeteer').executablePath().then((p) => process.stdout.write(p))";
    process.env.CHROME_BIN = execFileSync(process.execPath, ['-e', script], { encoding: 'utf8' });
  } catch (err) {
    console.warn('karma: could not resolve Chrome via puppeteer:', err.message);
  }
}

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // Explicit plugin list. Required under pnpm strict layout:
    // karma resolves plugins relative to its own dir inside the
    // .pnpm store, so autoload (karma-*) fails to find them.
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
    ],

    // list of files / patterns to load in the browser
    files: [
      'specs/**/*Spec.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*Spec.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
      devtool: 'inline-source-map',
      mode: 'development',
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    /* possible values: config.LOG_DISABLE || config.LOG_ERROR
    || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // ChromeHeadlessNoSandbox: running as root (containers/CI) needs
    // --no-sandbox, otherwise Chrome refuses to start.
    // Only use it on CI; locally keep plain ChromeHeadless.
    browsers: [process.env.CI ? 'ChromeHeadlessNoSandbox' : 'ChromeHeadless'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
