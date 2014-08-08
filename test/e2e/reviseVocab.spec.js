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
})