(function () {
    'use strict';

    angular.module('vocabApp')
        .controller('ReviseController', function ($scope, $http, $timeout, genericService) {

            var words;
            var wordsFromDb;
            $scope.index = 0;
            $scope.lang_left = 'german';
            $scope.lang_right = 'english';
            $scope.lang_right = 'english';
            $scope.sortOrder = 'random';
            $scope.revealedWords = [];
            $scope.revealedWord = '';
            $scope.blockButtons = false;

            $http.get('/api/words')
                .success(function (data) {
                    wordsFromDb = data.reverse();
                    sortWords();
                    $scope.totalWords = words.length;
                    $scope.word = words[$scope.index];
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            document.onkeydown = checkKey;

            function checkKey(e) {

                e = e || window.event;

                if (e.keyCode == '83') {
                    // s = show word
                    $scope.showWord($scope.word[$scope.lang_right]);
                    $scope.$apply();
                }
                else if (e.keyCode == '72') {
                    // h = hint
                    $scope.showHint($scope.word[$scope.lang_right], $scope.revealedWord.length);
                    $scope.$apply();
                }

            }


            $scope.showWord = function (word) {
                $scope.revealedWord = word;
                showNextWord();
            };

            $scope.showHint = function (word, currentSize) {
                $scope.revealedWord = genericService.hint(word, currentSize || 0);
                if ($scope.revealedWord === word) {
                    showNextWord();
                }
            };

            $scope.switchLanguage = function () {
                var tmpLang = $scope.lang_left;
                $scope.lang_left = $scope.lang_right;
                $scope.lang_right = tmpLang;
                $scope.revealedWord = '';
            };

            function sortWords() {
                if ($scope.sortOrder === 'random') {
                    words = genericService.shuffle(wordsFromDb);
                } else {
                    words = [].concat(wordsFromDb);
                }
            }

            $scope.switchSortOrder = function () {
                $scope.sortOrder = ($scope.sortOrder === 'random') ? 'recent' : 'random';
                sortWords();
                $scope.revealedWords = [];
            };

            $scope.genderColour = genericService.genderColour;

            var showNextWord = function () {
                $scope.blockButtons = true;
                $timeout(function () {
                    $scope.revealedWords.unshift($scope.word);
                    $scope.revealedWord = '';
                    $scope.index++;
                    $scope.word = words[$scope.index];
                    $scope.blockButtons = false;
                }, 1000);
            };

        });
}());