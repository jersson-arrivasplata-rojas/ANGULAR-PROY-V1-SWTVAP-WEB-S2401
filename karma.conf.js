process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-jasmine-html-reporter'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ANGULAR-PROY-V1-SWTVAP-WEB-ADMINISTRATOR-S2401'),
      subdir: '.',
      fixWebpackSourcePaths: true,
      reporters: [
        { type: 'html', subdir: './' },
        { type: 'text-summary' , subdir: './'},
        { type: 'lcovonly', subdir: './'  },
        { type: 'cobertura' }
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      }
    },
    reporters: ['progress','coverage', 'mocha', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'CustomChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      CustomChromeHeadless: {
          base: 'ChromeHeadless',
          flags: [
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222',
            '--no-sandbox'
          ]
      }
    }
  });
};
