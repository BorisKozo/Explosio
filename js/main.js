/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: '/Explosio',
    waitSeconds: 3000,
    shim: {
        'jaws': {
            exports: 'jaws'
        }

    },
    paths: {
        'jquery': 'lib/jquery',
        'jaws': 'lib/jaws',
        'lodash': 'lib/lodash'
    },
    hbs: {
        disableI18n: true
    }
});

require([
    'js/loader'
], function (loader) {
    loader.start();
});