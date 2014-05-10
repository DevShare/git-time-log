git-tilde-time
==============

Provides statistics for tilde-based time entries in commit messages.

Still in early-stage development, but the basics work. 

#### Usage:

```
// import
var GitTildeTime = require('git-tilde-time');

// initialize
var gtt = new GitTildeTime();

// get total time for repository
gtt.totalMinutes(function (total) {
  console.log(total);
});

// get total time by user (email)
gtt.totalMinsByUser(function (totalsByUser) {
  console.dir(totalsByUser);
});
```
