'use strict';

describe('tabs', function() {
    var elm, scope;

    // load the tabs code
    beforeEach(module('vocabApp'));

    beforeEach(inject(function($rootScope, $compile) {

        elm = angular.element('<div><span gender-coloured-word word="der Herd"></span></div>');

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));


    it('should render the word as the span text', inject(function($compile, $rootScope) {
        var wordSpan = elm.find('span')[0];

        expect(wordSpan.innerText).toBe('der Herd');
    }));


    it('should add gender class to word', inject(function($compile, $rootScope) {
        var wordSpan = elm.find('span')[0];

        expect(wordSpan.classList).toContain('masculine');
    }));

});
