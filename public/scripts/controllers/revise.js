'use strict';

angular.module('vocabApp')
    .controller('ReviseController', function ($scope, $http, $timeout, genericService) {

        var randomWords;
        $scope.index = 0;
        $scope.lang_left = 'german';
        $scope.lang_right = 'english';
        $scope.revealedWords = [];
        $scope.revealedWord = "";
        $scope.blockButtons = false;

        $http.get('/api/words')
            .success(function (data) {
                randomWords = genericService.shuffle(data);
                $scope.totalWords = randomWords.length;
                $scope.word = randomWords[$scope.index];
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        $scope.showWord = function (word) {
            $scope.revealedWord = word;
            showNextWord();
        }

        $scope.showHint = function (word, currentSize) {
            $scope.revealedWord = genericService.hint(word, currentSize || 0);
            if ($scope.revealedWord == word) {
                showNextWord();
            }
        }

        $scope.switchLanguage = function () {
            var tmpLang = $scope.lang_left;
            $scope.lang_left = $scope.lang_right;
            $scope.lang_right = tmpLang;
            $scope.revealedWord = "";
        };

        var showNextWord = function () {
            $scope.blockButtons = true;
            $timeout(function () {
                $scope.revealedWords.unshift($scope.word);
                $scope.revealedWord = "";
                $scope.index++;
                $scope.word = randomWords[$scope.index];
                $scope.blockButtons = false;
            }, 1000);
        };

    });