'use strict';

ddescribe('Controller: VocabController', function () {

    var vocabController, scope, httpMock;

    beforeEach(function () {
        module('vocabApp');

        inject(function ($controller, $rootScope, $httpBackend, genericService) {
            httpMock = $httpBackend;

            scope = $rootScope.$new();
            httpMock.when('GET', '/api/words').respond('[{"english": "hello", "german": "hallo"}, {"english": "goodbye", "german": "auf wiedersehen"}, {"english": "something", "german": "etwas"}]');

            vocabController = $controller('ReviseController', {
                $scope: scope,
                genericService: genericService
            });

        });
    });


    it('gets the list of words and puts it into the scope', function () {
        httpMock.expectGET('/api/words');
        httpMock.flush();
        expect(scope.words.length).toBe(3);
    })

    it('should move onto next word when show clicked', function () {
        var currentCount = scope.revisedWordCount;
        scope.showWord('something');
        expect(scope.revisedWordCount).toBe(currentCount + 1);
    });

    it('should show hints of a word, letter by letter', function () {
        scope.showHint('Word', 0);
        expect(scope.revealedWord).toBe('W');
    });

    it('should move onto next word when the final letter is hinted', function() {
        var currentCount = scope.revisedWordCount;
        scope.showHint('Knoblauch', 8);
        expect(scope.revisedWordCount).toBe(currentCount + 1);
    });


});