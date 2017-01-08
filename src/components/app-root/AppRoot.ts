export default class AppRoot implements ng.IComponentOptions {
    public template: string;

    constructor() {
        this.template = 'hello world!';
    }
}