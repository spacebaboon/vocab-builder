'use strict';

describe('Service: genericService', function () {

    var genericService;

    beforeEach(function () {

        module('vocabApp');

        inject(function (_genericService_) {
            genericService = _genericService_;
        });
    });

    it('should have the shuffle function', function () {
        expect(angular.isFunction(genericService.shuffle)).toBe(true);
    });

    it('should shuffle an array', function () {

        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        var randomisedArray = genericService.shuffle(array);
        expect(randomisedArray).not.toBe(array);

        // make sure we only have one of every element
        var numberCounts = {};
        randomisedArray.forEach(function (x) {
            numberCounts[x] = 0;
        });
        for (var i = 0; i < randomisedArray.length; i++) {
            var key = randomisedArray[i];
            numberCounts[key]++;
        }
        for (var key in numberCounts) {
            expect(numberCounts[key]).toBe(1);
        }
    });

    it('should hint successive letters of a word', function () {

        var word = 'Jaegerschnitzel';
        var currentSize = 0;
        expect(genericService.hint(word, currentSize)).toBe('J');
        expect(genericService.hint(word, currentSize + 1)).toBe('Ja');
        expect(genericService.hint(word, currentSize + 5)).toBe('Jaeger');
    });

    it('should skip spaces if present', function () {
        var word = 'eins zwei drei';
        expect(genericService.hint(word, 4)).toBe('eins z');
    });

    it('should hint the full article if present', function () {
        expect(genericService.hint('der Affe', 0)).toBe('der A');
        expect(genericService.hint('die Katze', 0)).toBe('die K');
        expect(genericService.hint('das Bier', 0)).toBe('das B');
        expect(genericService.hint('das Bier', 7)).toBe('das Bier');
    });

    it('should hint the English infinitive form if a verb', function(){
        expect(genericService.hint('to run', 0)).toBe('to r');
        expect(genericService.hint('to run', 4)).toBe('to ru');
    });

});
