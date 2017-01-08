import AppRootCtrl from './AppRootCtrl';
// import * as template from './approot.html';

const template = require('./app-root.html');

export default class AppRoot implements ng.IComponentOptions {
    public template: string;
    public controller: ng.IControllerConstructor
    constructor() {
        this.template = template;
        this.controller = AppRootCtrl;
    }
}