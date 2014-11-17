'use strict';

angular.module('vocabApp')
    .directive('tabbedNavigation', function() {
        return {
            restrict: 'E',
            templateUrl: '../views/directives/tabbedNavigation.html',
            replace: true,
            scope: { tab: '@tab'}
        };
    });
