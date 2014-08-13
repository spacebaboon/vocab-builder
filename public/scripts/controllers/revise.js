'use strict';

angular.module('vocabApp')
    .controller('ReviseController', function ($scope, $http, genericService) {

        $http.get('/api/words')
            .success(function (data) {
                $scope.words = genericService.shuffle(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $scope.revisedWordCount = 1;


        $scope.isCurrent = function (index) {
            return $scope.revisedWordCount === index + 1;
        };

        $scope.showWord = function (word) {
            $scope.revealedWord = word;
        }

        $scope.showHint = function (word, currentSize) {
            $scope.revealedWord = genericService.hint(word, currentSize || 0);
        }

        $scope.showNextWord = function () {
            $scope.revealedWord = "";
            $scope.revisedWordCount++;
        };
    });