'use strict';

angular.module('vocabApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/partials/vocab.html',
                controller: 'VocabController'
            })
            .when('/revise', {
                templateUrl: '../views/partials/revise.html',
                controller: 'ReviseController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
