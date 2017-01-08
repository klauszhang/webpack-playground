export default class AppRootCtrl {
    constructor($log) {
        /**
         * for injection, use ng-annotate-webpack-plugin
         * https://github.com/jeffling/ng-annotate-webpack-plugin
         */
        'ngInject';
        $log.info('hello, injection successful!');
    }
}