
({
    baseUrl: "./",

    locale: "en_ca",

    out: "main-built.js",
    mainConfigFile:"js/main.js",

    paths: {
        'jquery': 'lib/jquery',
        'jaws': 'lib/jaws',
        'lodash': 'lib/lodash'
    },

    name:"js/main.js",

    fileExclusionRegExp: "node_modules",

    inlineText: true,

    findNestedDependencies: true,

    optimize: "uglify"

})
