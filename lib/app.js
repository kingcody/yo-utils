'use strict';

var _ = require('lodash');

/**
 * @namespace yo-utils.app
 * @borrows module:yo-utils/lib/app.nameSuffix as nameSuffix
 * @borrows module:yo-utils/lib/app.pluckOps as pluckOps
 * @borrows module:yo-utils/lib/app.promptWhen as promptWhen
 */

/**
 * App related utilities
 * @module yo-utils/lib/app
 */

/**
 * Return the properly cased app suffix according to options
 * @param  {Object} self - the generator
 * @return {String}      - the app's name
 */
module.exports.nameSuffix = function nameSuffix(self) {
  var counter = 0;
  var suffix = self.options['app-suffix'];
  // Have to check this because of generator bug #386
  process.argv.forEach(function(val) {
    if (val.indexOf('--app-suffix') > -1) {
      counter++;
    }
  });
  if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
    suffix = 'App';
  }
  return suffix ? self._.classify(suffix) : '';
};

/**
 * Return a set of ops plucked from an options object
 * @param  {String|RegExp} prefix - the prefix to search on and strip
 * @param  {Object}        ops    - the options object to pluck from
 * @return {Object}               the plucked and stripped options
 */
module.exports.pluckOps = function pluckOps(prefix, ops) {
  return _.transform(ops, function(res, v, k) {
    if (k.match(prefix)) {
      res[k.replace(prefix, '')] = v;
    }
  });
};

/**
 * Return a variable when function that is bound to a generator's options
 * @param  {Object}   ops - the generator's options object
 * @return {Function}     the variable when function
 *                          when(option, [previousAnswer, ...])
 */
module.exports.promptWhen = function promptWhen(ops) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var op = args.shift();
    var extras = true;
    return function(answers) {
      answers[op] = ops[op];
      if (args.length) {
        var whens = _.pick(answers, args);
        for (var k in whens) {
          if (!whens[k]) {
            extras = false;
            break;
          }
        }
      }
      return typeof answers[op] === 'undefined' && extras;
    };
  };
};
