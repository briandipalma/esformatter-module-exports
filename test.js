'use strict';

var assert = require('assert');

var mocha = require('mocha');
var esformatter = require('esformatter');

var moduleExportsPlugin = require('./');

esformatter.register(moduleExportsPlugin);

mocha.describe('module exports plugin', function() {
	mocha.it('should add an empty line before module.exports.', function() {
		// Given.
		var codeStr = 'function MyClass() {}\nmodule.exports = MyClass;';

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, 'function MyClass() {\n}\n\nmodule.exports = MyClass;');
	});

	mocha.it('should add an two empty lines before module.exports.', function() {
		// Given.
		var codeStr = 'function MyClass() {}module.exports = MyClass;';

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, 'function MyClass() {\n}\n\nmodule.exports = MyClass;');
	});
});
