
/**
 * Module dependencies.
 */

var html = require.resolve('./html.hbs');
var mocha = require.resolve('mocha-phantomjs/node_modules/mocha');
var path = require('path');
var phantomjs = require('phantomjs');
var script = require.resolve('mocha-phantomjs');
var serve = require('duo-serve');
var spawn = require('win-spawn');
var url = 'http://localhost:3000/';

/**
 * Run tests using PhantomJS (via mocha-phantomjs)
 */

module.exports = function (entries, options) {
  var server = serve(options.root)
    .entry(entries)
    .favicon(false)
    .html(html)
    .logging(false)
    .title('duo-test')
    .use(options.plugins)
    .server();

  server
    .get('/mocha.css', function (req, res) {
      res.sendFile(path.resolve(mocha, '../mocha.css'));
    })
    .get('/mocha.js', function (req, res) {
      res.sendFile(path.resolve(mocha, '../mocha.js'));
    });

  server.listen(3000, start);
};

function start() {
  var proc = spawn(phantomjs.path, [ script, url ], { stdio: 'inherit' });

  proc.on('exit', function (code) {
    process.exit(code);
  });
}
