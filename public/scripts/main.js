'use strict';

angular.module('vocabApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/vocab.html',
                controller: 'VocabController'
            })
            .when('/revise', {
                templateUrl: '../views/revise.html',
                controller: 'ReviseController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
