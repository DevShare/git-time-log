/* global module, require */
var gitlog = require('gitlog'),
    _ = require('underscore');

var GitTildeTime = function (opts) {

  var self = this;

  this._repo = opts['repo'] || '.';

  this.getMinsFromMessage = function (message) {
    var timeRegex = /~(\d?\d?):(\d\d)/,
        match = message.match(timeRegex),
        hours, minutes;

    hours = match ? match[1] : null;
    minutes = match ? match[2] : null;

    hours = parseInt(hours, 10) || 0;
    minutes = parseInt(minutes, 10) || 0;

    return (hours * 60) + minutes;
  };

  this.totalMinutes = function (callback) {
    gitlog({ repo: self._repo, fields: ['subject'], number: 9999999 }, function (err, commits) {
      if (err) {
        throw(err);
      }

      // calculate the total time in commit messages
      var total = _.reduce(commits, function (total, commit) {
        return total + self.getMinsFromMessage(commit.subject);
      }, 0);

      callback(total);
    });
  };

  this.totalMinsByUser = function (callback) {
    gitlog({ repo: self._repo, fields: ['subject', 'authorEmail'], number: 9999999 },
      function (err, commits) {
        if (err) {
          throw(err);
        }

        // calculate the total time in commit messages
        var totalByUser = _.reduce(commits, function (totals, commit) {
          var userTotal = totals[commit.authorEmail] || 0;

          totals[commit.authorEmail] = userTotal + self.getMinsFromMessage(commit.subject);

          return totals;
        }, {});

        callback(totalByUser);
      }
    );
  };
};

module.exports = GitTildeTime;
