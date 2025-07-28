module.exports = {
    apiKey: process.env.APPLITOOLS_API_KEY,

    batchName: 'Coffee Cart Visual Tests',

    browser: [
        {name: 'chrome', width: 1200, height: 800}
    ],

    concurrency: 1,

    matchLevel: 'Strict',

    ignoreCaret: true,

    ignoreDisplacements: false,

    failCypressOnDiff: false,

    failCypressAfterAllSpecs: false
}