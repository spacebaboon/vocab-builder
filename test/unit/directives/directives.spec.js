describe('Unit testing directives', function () {
    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('vocabApp'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    xit('should show two tabs', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div tabbed-navigation tab='vocab'></div>")($rootScope);
        // fire all the watches, so any scope expressions will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        console.log(element.html());

        expect(element.html()).toContain("<ul>");
    });

    xit('should render a masculine word in blue', function(){
        "use strict";
        var element = $compile('<div><span gender-coloured-word word="der Herd"></span></div>')($rootScope);
        $rootScope.$digest();
        console.log(element);
        expect(element.find('span')).toContain('<span class="word"');
    });
});