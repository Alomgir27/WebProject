const util = require('util');
const is = require('type-is');

/**
 * Messages to be used
 * @type {Object}
 */
const messages = {
    'contentType': 'Unexpected Content-Type "%s", expecting "application/json".',
    'parseError': 'Problems parsing JSON',
    'emptyBody': 'Request body is empty'
};

/**
 * Check if a request has a request body.
 *
 * @param {Object} request
 * @return {Boolean}
 * @api public
 */
function hasbody(req) {
    return !!req.body;
}

function jsonparser({ strict = false, bodyCheck = false, type = 'json' } = {}) {
    return function (req, res, next) {
        var err;
        if (strict && !is(req, type)) {
            const msg = util.format(messages.contentType, req.headers['content-type']);
            err = new Error(msg);
            err.status = 415;
            return next(err);
        }
        if (bodyCheck && !hasbody(req)) {
            err = new Error(messages.emptyBody);
            err.status = 400;
            return next(err);
        }
        try {
            req.json = JSON.parse(req.body);
        } catch (e) {
            err = new Error(messages.parseError);
            err.status = 400;
            return next(err);
        }
        next();
    };
}

module.exports = jsonparser;
