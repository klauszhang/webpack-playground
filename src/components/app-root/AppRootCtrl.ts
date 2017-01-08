export default class AppRootCtrl {
    public message: string;
    constructor($log) {
        /**
         * for injection, use ng-annotate-webpack-plugin
         * https://github.com/jeffling/ng-annotate-webpack-plugin
         */
        'ngInject';
        $log.info('hello, injection successful!');
        this.message = 'hello world123';
    }
}