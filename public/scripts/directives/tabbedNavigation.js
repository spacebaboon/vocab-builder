angular.module('vocabApp')
    .directive('tabbedNavigation', function () {
        'use strict';

        return {
            templateUrl: 'views/partials/tabbedNavigation.html',
            replace: true,
            scope: {
                active: '@tab'
            }
        };
    });
