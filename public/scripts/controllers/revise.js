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
        $scope.lang_left = 'german';
        $scope.lang_right = 'english';

        $scope.isCurrent = function (index) {
            return $scope.revisedWordCount === index + 1;
        };

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
            $scope.revealedWord = "";
            $scope.revisedWordCount++;
        };

    });