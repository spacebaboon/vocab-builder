'use strict'

angular.module('vocabApp')
    .controller('ReviseController', function ($scope, $http) {

        $http.get('/api/words')
            .success(function (data) {
                $scope.words = randomise(data);
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        function randomise(array) {
            for (var i = 0; i < array.length; i++) {
                var randomIndex = Math.floor(Math.random() * array.length);
                var a = array[i];
                array[i] = array[randomIndex];
                array[randomIndex] = a;
            }
            return array;
        };
    })