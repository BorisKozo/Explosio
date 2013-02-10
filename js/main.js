/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: '/',
    waitSeconds: 3000,
    shim: {
        'jaws': {
            exports: 'jaws'
        }

    },
    paths: {
        'jquery': 'lib/jquery',
        'jaws': 'lib/jaws'

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