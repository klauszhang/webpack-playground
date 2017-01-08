import * as angular from 'angular';

import 'angular-material';
import 'angular-animate';
import 'angular-aria';

import 'angular-material/angular-material.css';

import './components';

angular.module('app', [
    /**
     * vendor
     */
    'ngMaterial',

    'app.components'
]);

angular.bootstrap(document, ['app'], {
    strictDi: true
});