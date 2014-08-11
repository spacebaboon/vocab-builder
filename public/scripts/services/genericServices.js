/* Generic Services */
angular.module('vocabApp')
    .factory("genericServices", function () {
        return {

            randomise: function(array) {
            for (var i = 0; i < array.length; i++) {
                var randomIndex = Math.floor(Math.random() * array.length);
                var a = array[i];
                array[i] = array[randomIndex];
                array[randomIndex] = a;
            }
            return array;
        },
            doSomethingElse: function () {
                //Do something else here
            }
        }
    });