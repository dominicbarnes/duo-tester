
/**
 * Module dependencies.
 */

var html = require.resolve('./html.hbs');
var mocha = require.resolve('mocha-phantomjs/node_modules/mocha');
var path = require('path');
var serve = require('duo-serve');

/**
 * Run tests using PhantomJS (via mocha-phantomjs)
 */

module.exports = function (entries, options) {
  var server = serve(options.root)
    .entry(entries)
    .html(html)
    .title('duo-tester')
    .use(options.plugins)
    .server();

  server
    .get('/mocha.css', function (req, res) {
      res.sendFile(path.resolve(mocha, '../mocha.css'));
    })
    .get('/mocha.js', function (req, res) {
      res.sendFile(path.resolve(mocha, '../mocha.js'));
    });

  server.listen(options.port, function () {
    console.log();
    console.log('  duo-tester running at http://localhost:%d/', options.port);
    console.log();
  });
};
