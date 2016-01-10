'use strict';

describe('tabs', function () {

    var elm, scope;

    beforeEach(module('vocabApp'));
    beforeEach(inject(function($rootScope, $compile) {

        elm = angular.element('<div><span gender-coloured-word word="der Herd"></span></div>');

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));

    xit('should bind the content', function () {
        var contents = elm.find('div.tab-content div.tab-pane');

        expect(contents.length).toBe(2);
        expect(contents.eq(0).text()).toBe('first content is ');
        expect(contents.eq(1).text()).toBe('second content is ');

        scope.$apply(function () {
            scope.first = 123;
            scope.second = 456;
        });

        expect(contents.eq(0).text()).toBe('first content is 123');
        expect(contents.eq(1).text()).toBe('second content is 456');
    });


    xit('should set active class on title', function () {
        var titles = elm.find('ul.nav-tabs li');

        expect(titles.eq(0)).toHaveClass('active');
        expect(titles.eq(1)).not.toHaveClass('active');
    });


    xit('should set active class on content', function () {
        var contents = elm.find('div.tab-content div.tab-pane');

        expect(contents.eq(0)).toHaveClass('active');
        expect(contents.eq(1)).not.toHaveClass('active');
    });


    xit('should change active pane when title clicked', function () {
        var titles = elm.find('ul.nav-tabs li');
        var contents = elm.find('div.tab-content div.tab-pane');

        // click the second tab
        titles.eq(1).find('a').click();

        // second title should be active
        expect(titles.eq(0)).not.toHaveClass('active');
        expect(titles.eq(1)).toHaveClass('active');

        // second content should be active
        expect(contents.eq(0)).not.toHaveClass('active');
        expect(contents.eq(1)).toHaveClass('active');
    });

});