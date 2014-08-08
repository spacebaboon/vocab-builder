'use strict'

angular.module('vocabApp')
    .directive('revealWord', function () {
        return {
            restrict: 'E',
            templateUrl: '../views/revealWord.html',
            replace: true,
            scope: { tab: "@tab"}
        };
    })
