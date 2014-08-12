'use strict';

describe('Controller: VocabController', function () {

    var vocabController, scope, httpMock;

    beforeEach(function () {
        module('vocabApp');

        inject(function ($controller, $rootScope, $httpBackend, genericService) {
            httpMock = $httpBackend;

            scope = $rootScope.$new();
            httpMock.when('GET', '/api/words').respond('[{"english": "hello", "german": "hallo"}, {"english": "goodbye", "german": "auf wiedersehen"}]');

            vocabController = $controller('ReviseController', {
                $scope: scope,
                genericService: genericService
            });

        });
    });


    it('gets the list of words and puts it into the scope', function () {
        httpMock.expectGET('/api/words');
        httpMock.flush();
        expect(scope.words.length).toBe(2);
    })

    it('should display whole word', function () {
        scope.showWord('something');
        expect(scope.revealedWord).toBe('something');
    });

    it('should show hints of a word, letter by letter', function () {
        scope.showHint('Word', 0);
        expect(scope.revealedWord).toBe('W');
    });


});