'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var appUtils = require('./app');
var pluralize = require('pluralize');

/**
 * Shared contructor between Base and NamedBase
 * @class
 */
var UtilsBase = function() {
  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  /**
   * The generated app's name
   * @type {String}
   */
  this.appname = this._.slugify(this._.humanize(this.appname));
  this.scriptAppName = this._.camelize(this.appname) + appUtils.nameSuffix(this);

  /**
   * The camelCased name argument
   * @type {String}
   */
  this.cameledName = this._.camelize(this.name);
  /**
   * The Classed name argument
   * @type {String}
   */
  this.classedName = this._.classify(this.name);
  /**
   * The pluralized name argument
   * @type {String}
   */
  this.pluralizedName = pluralize.plural(this.name);

  this.sourceRoot(path.join(__dirname, '/templates'));
};

/**
 * Extended yeoman-generator bases
 * @module yo-utils/lib/base
 */
module.exports = {
  /**
   * @class
   * @extends external:"yeoman-generator.generators".Base
   * @extends UtilsBase
   */
  Base: yeoman.generators.Base.extend({
    constructor: function() {
      yeoman.generators.Base.apply(this, arguments);
      UtilsBase.apply(this, arguments);
    }
  }),

  /**
   * @class
   * @extends external:"yeoman-generator.generators".NamedBase
   * @extends UtilsBase
   */
  NamedBase: yeoman.generators.NamedBase.extend({
    constructor: function() {
      yeoman.generators.NamedBase.apply(this, arguments);
      UtilsBase.apply(this, arguments);
    }
  })
};

/**
 * Yeoman generator namespace
 * @external "yeoman-generator.generators"
 */

/**
 * Yeoman generator Base class
 * @class external:"yeoman-generator.generators".Base
 * @hide
 * @see {@link http://yeoman.github.io/generator/Base.html Base}
 */

/**
 * Yeoman generator NamedBase class
 * @class external:"yeoman-generator.generators".NamedBase
 * @see {@link http://yeoman.github.io/generator/NamedBase.html NamedBase}
 */
