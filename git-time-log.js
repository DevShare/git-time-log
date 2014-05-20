#!/usr/bin/env node

/* global module, require, process, console */

var gitlog = require('gitlog'),
    _ = require('underscore'),
    moment = require('moment'),
    program = require('commander');

var GitTimeLog = function (opts) {

  opts = opts || {};

  this._repo = opts['repo'] || '.';
  this._author = opts['author'];
  this._number = opts['number'] || 9999999;

  this.formatTime = function (totalMins) {
    var duration = moment.duration({ minutes: totalMins }),
        hours = Math.floor(duration.asHours()),
        mins = totalMins - (hours * 60);

    // ensure mins is 2 characters in length
    if (mins.toString().length < 2) {
      mins = '0' + mins.toString();
    }

    // allow hours to be an empty string
    hours = hours !== 0 ? hours.toString() : '';

    return '~' + hours + ':' + mins;
  };

  this.getTimeFromMessage = function (message) {
    var timeRegex = /~(\d?\d?):(\d\d)/,
        match = message.match(timeRegex),
        hours, minutes;

    hours = match ? match[1] : null;
    minutes = match ? match[2] : null;

    hours = parseInt(hours, 10) || 0;
    minutes = parseInt(minutes, 10) || 0;

    return { hours: hours, minutes: minutes };
  };

  this.getMinsFromMessage = function (message) {
    var messageTime = this.getTimeFromMessage(message);

    return (messageTime.hours * 60) + messageTime.minutes;
  };

  this.parseCommits = function (parseFn) {
    gitlog({
      repo: this._repo, 
      author: this._author, 
      fields: ['subject', 'authorEmail'], 
      number: this._number },
      function (err, commits) {
        if (err) {
          throw(err);
        }

        parseFn(commits);
      }
    );
  };

  this.minsByAuthor = function (done) {
    var self = this;
    this.parseCommits(function (commits) {
      // calculate the total time in commit messages
      var totalByUser = _.reduce(commits, function (totals, commit) {
        var userTotal = totals[commit.authorEmail] || 0,
            commitMins = self.getMinsFromMessage(commit.subject);

        // add to the totals
        totals[commit.authorEmail] = userTotal + commitMins;

        return totals;
      }, {});

      done(totalByUser);
    });
  };

  this.totalMinutes = function (done) {
    var self = this;
    this.parseCommits(function (commits) {
      // calculate the total time in commit messages
      var total = _.reduce(commits, function (total, commit) {
        return total + self.getMinsFromMessage(commit.subject);
      }, 0);

      done(total);
    });
  };

};
module.exports = GitTimeLog;

// For command-line usage...
program
  .version('0.0.1')
  .option('-d, --dir <path>', 'Set the path to parse. Defaults to current directory.')
  .option('-a, --author <author>', 'Returns only time for the given author.')
  .option('-n, --number <number>', 'Number of commits to parse.');

program
  .command('authors')
  .description('Returns time by author')
  .action(function(env){
    var gtl = new GitTimeLog({ repo: program.dir, number: program.number });
    gtl.minsByAuthor(function (results) {
      _.each(results, function (totalMins, author) {
        console.log(author + ': ' + gtl.formatTime(totalMins));
      });
    });
  });

program
  .command('total')
  .description('Returns total time for repo')
  .action(function(env){
    var gtl = new GitTimeLog({ repo: program.dir, author: program.author, number: program.number });
    gtl.totalMinutes(function (mins) {
      console.log(gtl.formatTime(mins));
    });
  });

program.parse(process.argv);
