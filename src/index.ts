import * as angular from 'angular';
import './components';

angular.module('app', [
    'app.components'
]);

angular.bootstrap(document, ['app'], {
    strictDi: true
});