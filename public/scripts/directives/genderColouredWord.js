angular.module('vocabApp')
    .directive('genderColouredWord', function () {
        'use strict';

        return {
            template: '<span class="word" ng-class="$parent.genderColour(word)">{{ word }}</span>',
            replace: true,
            scope: {
                word: '@'
            }
        };
    });