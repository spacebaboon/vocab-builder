'use strict';

angular.module('vocabApp')
    .controller('ReviseController', function ($scope, $http, genericService) {

        $http.get('/api/words')
            .success(function (data) {
                $scope.words = genericService.randomise(data);
//                $scope.words = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        $scope.showWord = function(word) {
            $scope.revealedWord = word;
        }

        $scope.showHint = function showHint(word, currentSize) {
            $scope.revealedWord = genericService.hint(word, currentSize || 0);
        }
    });