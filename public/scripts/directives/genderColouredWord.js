'use strict';

angular.module('vocabApp')
    .directive('genderColouredWord', function () {
        return {
            template: '<span class="word" ng-class="$parent.genderColour(word)">{{ word }}</span>',
            replace: true,
            scope: {
                word: '@'
            }
        };
    });