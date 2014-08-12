/* Generic Services */
angular.module('vocabApp')
    .factory("genericService", function () {
        return {

            randomise: function (array) {
                var newArray = [];
                for (var i = 0; i < array.length; i++) {
                    var randomIndex = Math.floor(Math.random() * array.length);
                    var a = array[i];
                    newArray[i] = array[randomIndex];
                    newArray[randomIndex] = a;
                }
                return newArray;
            },

            hint: function (word, currentSize) {
                var hintedWord = word.substring(0, currentSize + 1);
                if (hintedWord.charAt(currentSize) === ' ') {
                    return word.substring(0, currentSize + 2);
                } else if (currentSize < 4 && word.match('^(der|die|das)')) {
                    return word.substr(0, 5);
                }
                return hintedWord;
            }
        }
    });