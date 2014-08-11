'use strict';

describe('Controller: VocabController', function () {

    beforeEach(module('vocabApp'));

    var VocabController, scope, httpMock;

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;


        scope = $rootScope.$new();
        httpMock.when('GET', '/api/words').respond("{}");


        VocabController = $controller('VocabController', {
            $scope: scope
        });
    }));

    it('gets the list of words and puts it into the scope', function () {
        httpMock.expectGET('/api/words');
        httpMock.flush();
        expect(scope.words).toMatch("some data");
    })

    it('should show hints of a word, letter by letter', function () {
        VocabController.showHint('somelongword', '');
        expect(scope.revealedWord).toBe('s');
    });


//    it('should randomise arrays', function () {
//        var arrayInput = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//        var randomised1;
//    })

});