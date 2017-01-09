/// <reference path="../../app.d.ts" />

import AppRootCtrl from './AppRootCtrl';

const template = require('./app-root.html');

export default class AppRoot implements ng.IComponentOptions {
    public template: string;
    public controller: ng.IControllerConstructor
    constructor() {
        this.template = template;
        this.controller = AppRootCtrl;
    }
}