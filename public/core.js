// public/core.js
angular.module('vocabApp', ['ngRoute']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/vocab.html',
                controller: 'VocabController'
            })
            .when('/revise', {
                templateUrl: 'views/revise.html',
                controller: 'ReviseController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .directive('tabbedNavigation', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/tabbedNavigation.html',
            replace: true,
            scope: { tab: "@tab"}
        };
    });

function VocabController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all words and show them
    $http.get('/api/words')
        .success(function (data) {
            $scope.words = data;
            console.log(data);
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
                console.log(data);
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
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}

function ReviseController($scope, $http) {
    $scope.message = 'Hello Ben!';
};

