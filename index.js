'use strict';

var isBr = require('rocambole-token').isBr;
var after = require('rocambole-token').after;
var before = require('rocambole-token').before;

exports.tokenBefore = function(token) {
	if (isModuleExportsToken(token)) {
		var prev = token.prev;

		// If the token before the module exports isn't a newline add one.
		if (isBr(prev) === false) {
			before(token, createNewLineToken());
		}

		var prevToPrev = token.prev.prev;

		// If the token two steps back is also not a newline add one.
		if (isBr(prevToPrev) === false) {
			after(prevToPrev, createNewLineToken());
		}
	}
};

/**
 * Returns true if the provided token is the module in `module.exports`.
 * @param   {Object}  token Rocambole token
 * @returns {Boolean} True if module.export token
 */
function isModuleExportsToken(token) {
	var isModuleIdentifier = token.type === 'Identifier' && token.value === 'module';

	if (isModuleIdentifier && token.next && token.next.next) {
		var isFollowedByDot = token.next.value === '.' && token.next.type === 'Punctuator';

		if (isFollowedByDot && token.next.next) {
			var tokenAfterDot = token.next.next;

			return tokenAfterDot.type === 'Identifier' && tokenAfterDot.value === 'exports';
		}
	}

	return false;
}

/**
 * Creates a newline token
 * @returns {Object} Newline rocambole token
 */
function createNewLineToken() {
	return {
		value: '\n',
		type: 'LineBreak'
	};
}
