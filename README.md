git-time-log
==============

Provides statistics for time entries in commit messages.

Still in early-stage development, but the basics work.

#### Usage:

```
// import
var GitTimeLog = require('git-time-log');

// initialize
var gtl = new GitTimeLog();

// get total time for repository
gtl.totalMinutes(function (total) {
  console.log(total);
});

// get total time by user (email)
gtl.totalMinsByUser(function (totalsByUser) {
  console.dir(totalsByUser);
});
```
