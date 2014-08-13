describe('E2E: revise vocab page', function() {

    beforeEach(function () {
        browser.get('http://localhost:8080/#/revise');
    });

    it('should show the revise tab as active', function () {
        $('#navigation .active').getText().then(function(text) {
            expect(text).toBe('revise');
        })
    });

    it('should display a single word', function() {
        element.all(by.repeater('word in randomWords')).then(function(wordList){
            expect(wordList.length).toBe(1);

        });
    });

    it('should show the whole word when show button clicked, and replace show and hint buttons with next button', function() {
        element.all(by.repeater('word in words')).then(function (wordList) {

        });
    });

    it('should show successive letters of the word when the hint button clicked', function() {

    });

    it('should show the next word when the next button clicked', function() {

    });

    it('should increment the revised word count with each word', function() {

    });

})