'use strict'

describe('E2E: edit vocab page', function () {
    var ptor;
    var englishWord = 'irregularword';
    var germanWord = 'das Unregelmässigewort';

    beforeEach(function () {
        browser.get('http://localhost:9090/');
        browser.debugger();
        ptor = protractor.getInstance();
    });

    var getWordCount = function () {
        return element(by.binding('words.length')).getText().then(function (text) {
            return parseInt(text);
        });
    };

    it('should load the word list by default', function () {
        var ele = by.id('word-count');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    // TODO: re-enable when navigation decided
    xit('should show the revise tab as active', function () {
        $('#navigation .active').getText().then(function(text) {
            expect(text).toBe('vocabulary');
        })
    });

    it('should count and correctly display the number of words in the list', function () {
        element.all(by.repeater('word in words')).then(function (wordsInList) {
            getWordCount().then(function (wordCount) {
                expect(wordsInList.length).toBe(wordCount);
            })
        });
    });

    // TODO: re-enable when word list markup refactor finished
    xit('should add a word using the form fields, and append it to the list', function () {
        getWordCount().then(function (wordCount) {

            element(by.model('formData.english')).sendKeys(englishWord);
            element(by.model('formData.german')).sendKeys(germanWord);
            element(by.id('add-button')).click();

            $('tr:last-child > #english').getText().then(function (text) {
                expect(text).toBe(englishWord);
            });
            $('tr:last-child > #german').getText().then(function (text) {
                expect(text).toBe(germanWord);
            });

            getWordCount().then(function (newWordCount) {
                expect(newWordCount).toBe(wordCount + 1);
            })
        });
    });

    // TODO: re-enable when word list markup refactor finished
    xit('should delete a word by clicking the checkbox', function () {
        getWordCount().then(function (wordCount) {

            $('tr:last-child input[type=checkbox]').click().then(function () {
                getWordCount().then(function (newWordCount) {
                    expect(newWordCount).toBe(wordCount - 1);
                });
            });

        });
    });

})