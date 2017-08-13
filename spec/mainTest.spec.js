'use strict';

var helpers = require('../src/helpers');

describe("Short suite for example test", () => {
    it("returns error if no select value passed", () => {
        expect(() => {helpers.getForm()}).toThrowError();
    });
    it ("returns form", () => {
        expect(helpers.getForm('movies')).toContain('form')
    })
});