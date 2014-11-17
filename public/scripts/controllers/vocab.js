(function () {
    'use strict';

    angular.module('vocabApp')
        .controller('VocabController', function ($scope, $http, genericService) {

            $scope.formData = {};

            // when landing on the page, get all words and show them
            $http.get('/api/words')
                .success(function (data) {
                    $scope.words = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            // when submitting the add form, send the text to the node API
            $scope.createWord = function () {
                $http.post('/api/words', $scope.formData)
                    .success(function (data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.words = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            // delete a word after checking it
            $scope.deleteWord = function (id) {
                $http.delete('/api/words/' + id)
                    .success(function (data) {
                        $scope.words = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            $scope.genderColour = genericService.genderColour;


        });
})();