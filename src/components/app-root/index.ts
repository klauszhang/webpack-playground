import AppRoot from './AppRoot';
import * as angular from 'angular';

angular.module('app.components.root', [])
    .component('appRoot', new AppRoot())
