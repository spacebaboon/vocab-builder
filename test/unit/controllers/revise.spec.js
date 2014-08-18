'use strict';

describe('Controller: VocabController', function () {

    var vocabController, scope, httpMock, timeout;

    beforeEach(function () {
        module('vocabApp');

        inject(function ($controller, $rootScope, $httpBackend, $timeout, genericService) {
            httpMock = $httpBackend;
            timeout = $timeout;
            scope = $rootScope.$new();
            httpMock.when('GET', '/api/words').respond('[{"english": "hello", "german": "hallo"}, {"english": "goodbye", "german": "auf wiedersehen"}, {"english": "something", "german": "etwas"}]');

            vocabController = $controller('ReviseController', {
                $scope: scope,
                $timeout: timeout,
                genericService: genericService
            });

        });
    });



    it('should move onto next word when show clicked', function () {
        httpMock.expectGET('/api/words');
        httpMock.flush();
        var currentCount = scope.index;
        scope.showWord('something');
        timeout.flush();
        expect(scope.index).toBe(currentCount + 1);
    });

    it('should show hints of a word, letter by letter', function () {
        scope.showHint('Word', 0);
        expect(scope.revealedWord).toBe('W');
    });

    it('should move onto next word when the final letter is hinted', function() {
        httpMock.expectGET('/api/words');
        httpMock.flush();
        var currentCount = scope.index;
        scope.showHint('Knoblauch', 8);
        timeout.flush();
        expect(scope.index).toBe(currentCount + 1);
    });


});