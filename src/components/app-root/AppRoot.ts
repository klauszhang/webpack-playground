import AppRootCtrl from './AppRootCtrl';

export default class AppRoot implements ng.IComponentOptions {
    public template: string;
    public controller: ng.IControllerConstructor
    constructor() {
        this.template = 'hello world!';
        this.controller = AppRootCtrl;
    }
}