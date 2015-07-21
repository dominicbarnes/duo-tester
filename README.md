# duo-tester

> A test server for developers using duo

## Usage

```

  Usage: duo-tester [options] [command]


  Commands:

    browser [files...]    start a web server for performing browser tests
    phantomjs [files...]  run headless tests using mocha-phantomjs

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -r, --root <dir>    set root directory
    -u, --use <plugin>  use transform plugin(s)

```

## Examples

```sh
# starts a web server with scripts at test/*.js
$ duo-tester browser

# uses mocha-phantomjs to run tests using test/*.js
$ duo-tester phantomjs

# use alternate test files (both CSS and JS for example)
$ duo-tester browser test/*.js test/*.css
```
