'use strict';

describe('Service: genericService', function () {

    var genericService;

    beforeEach(function () {

        module('vocabApp');

        inject(function (_genericService_) {
            genericService = _genericService_;
        });
    });

    it('should have the randomise function', function () {
        expect(angular.isFunction(genericService.randomise)).toBe(true);
    });

    it('should randomise an array', function () {

        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var randomisedArray = genericService.randomise(array);
        expect(randomisedArray).not.toBe(array);
    });

    it('should hint successive letters of a word', function() {

        var word = 'Jaegerschnitzel';
        var currentSize = 0;
        expect(genericService.hint(word, currentSize)).toBe('J');
        expect(genericService.hint(word, currentSize + 1)).toBe('Ja');
        expect(genericService.hint(word, currentSize + 5)).toBe('Jaeger');
    });

    it('should skip spaces if present', function() {
        var word = 'eins zwei drei';
        expect(genericService.hint(word, 4)).toBe('eins z');
    });

    it('should hint the full article if present', function() {
        expect(genericService.hint('der Affe', 0)).toBe('der A');
        expect(genericService.hint('die Katze', 0)).toBe('die K');
        expect(genericService.hint('das Bier', 0)).toBe('das B');
        expect(genericService.hint('das Bier', 7)).toBe('das Bier');
    });

});
