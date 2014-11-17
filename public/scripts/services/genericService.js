'use strict';

angular.module('vocabApp')
    .factory('genericService', function () {
        return {

            shuffle: function (array) {
                var newArray = [].concat(array);
                for (var i = 0; i < newArray.length; i++) {
                    var randomIndex = Math.floor(Math.random() * newArray.length);
                    var tmp = newArray[i];
                    newArray[i] = newArray[randomIndex];
                    newArray[randomIndex] = tmp;
                }
                return newArray;
            },

            hint: function (word, currentSize) {
                var hintedWord = word.substring(0, currentSize + 1);
                if (hintedWord.charAt(currentSize) === ' ') {
                    return word.substring(0, currentSize + 2);
                } else if (currentSize < 4 && word.match('^(der|die|das)')) {
                    return word.substr(0, 5);
                } else if (currentSize < 3 && word.match('^to ')) {
                    return word.substr(0, 4);
                }
                return hintedWord;
            },

            genderColour: function (word) {
                if (!word) return 'unknown';

                switch (word.substr(0, 4)) {
                    case 'der ':
                        return 'masculine';
                    case 'die ':
                        return 'feminine';
                    case 'das ':
                        return 'neuter';
                    default:
                        return 'unknown';
                }
            }
        };
    });