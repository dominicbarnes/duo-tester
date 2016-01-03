
/**
 * Module dependencies.
 */

var path = require('path');
var ELECTRON_PATH = require('electron-prebuilt');
var PATH = process.env.PATH;
var cmd = path.resolve(
  require.resolve('electron-mocha'), '..', 'bin', 'electron-mocha'
);
var Duo = require('duo');
var spawn = require('win-spawn');
var tmp = require('os-tmpdir');
var fs = require('fs');

/**
 * Run tests using Electron (via electron-mocha).
 */

module.exports = function (entries, options) {
  var entry = entries.map(requireString).join('\n');
  build(entry, options.root, options.plugins, function (err, res) {
    if (err) throw err;

    var file = randomFile();
    fs.writeFile(file, res.code, function (err) {
      if (err) throw err;

      var opts = { stdio: 'inherit', env: { ELECTRON_PATH, PATH } };
      var args = [ '--renderer', file ];
      var proc = spawn(cmd, args, opts);
      proc.on('error', console.error.bind(console));
      proc.on('exit', function (code) {
        fs.unlink(file); // who cares if we fail to delete the temp file
        process.exit(code);
      });
    });
  });
};

/**
 * Get a random temporary file name.
 *
 * @return {String}
 * @api private
 */

function randomFile() {
  return path.join(tmp(), Math.random().toString(36).slice(2) + '.js');
}

/**
 * Build the given `entry` with `Duo`.
 *
 * @param {String} entry
 * @param {String} root
 * @param {Array} plugins
 * @param {Function} fn
 * @api private
 */

function build(entry, root, plugins, fn) {
  var duo = new Duo(root);
  duo.entry(entry, 'js');
  duo.use(plugins);
  duo.run(fn);
}

/**
 * Get a `require()` string for the file `file`.
 *
 * @param {String} file
 * @return {String}
 * @api private
 */

function requireString(file) {
  return 'require("' + file + '")';
}
