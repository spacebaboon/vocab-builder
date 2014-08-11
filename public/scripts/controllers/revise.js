'use strict';

angular.module('vocabApp')
    .controller('ReviseController', function ($scope, $http, genericServices) {

        $http.get('/api/words')
            .success(function (data) {
                $scope.words = genericServices.randomise(data);
//                $scope.words = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        $scope.showWord = function(word) {
            $scope.revealedWord = word;
        }
        $scope.showHint = function showHint(fullWord, revealedWord) {

        }
    });