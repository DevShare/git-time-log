git-time-log
==============

[![Build Status](https://travis-ci.org/DevShare/git-time-log.svg?branch=master)](https://travis-ci.org/DevShare/git-time-log)

Provides statistics for time entries in commit messages.

Still in early-stage development, but the basics work.

### Usage

#### Command-line:

```
  Usage: git-time-log [options] [command]

  Commands:

    authors                Returns time by author
    total                  Returns total time for repo

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -d, --dir <path>       Set the path to parse. Defaults to current directory.
    -a, --author <author>  Returns only time for the given author.
    -n, --number <number>  Number of commits to parse.
```

#### Node:

```
// import
var GitTimeLog = require('git-time-log');

// initialize
var gtl = new GitTimeLog();

// get total time for repository
gtl.totalMinutes(function (total) {
  console.log(total);
});

// get total time by author (email)
gtl.minsByAuthor(function (totalsByUser) {
  console.dir(totalsByUser);
});
```
