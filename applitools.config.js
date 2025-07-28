module.exports = {
    apiKey: process.env.APPLITOOLS_API_KEY,
    appName: 'Coffee Cart Application',
    batchName: 'Coffee Cart Tests',

    browser: [
        {name: 'chrome', width: 1200, height: 800}
    ],

    failCypressOnDiff: false,
    failCypressAfterAllSpecs: false,

    concurrency: 1,
    matchLevel: 'Strict',
    ignoreCaret: true,
    saveNewTests: true,
    saveFailedTests: false,

    serverUrl: 'https://eyes.applitools.com',
    isDisabled: false
}