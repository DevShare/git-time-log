/* global require, describe, it, beforeEach */

var assert = require("assert"),
    GitTimeLog = require("../git-time-log");

describe('git-time-log', function() {
  var gitTimeLog;

  beforeEach(function () {
    gitTimeLog = new GitTimeLog();
  });

  it('should exist', function () {
    assert(GitTimeLog);
  });

  describe('formatTime', function () {
    it('should exist', function () {
      assert(gitTimeLog.formatTime);
    });

    it('should format small minutes < 10', function () {
      assert(gitTimeLog.formatTime(0), '~:00');
      assert(gitTimeLog.formatTime(1), '~:01');
      assert(gitTimeLog.formatTime(9), '~:09');
    });

    it('should format medium minutes 9 < x < 60', function () {
      assert.equal(gitTimeLog.formatTime(10), '~:10');
      assert.equal(gitTimeLog.formatTime(59), '~:59');
    });

    it('should format large minutes > 59', function () {
      assert.equal(gitTimeLog.formatTime(60), '~1:00');
      assert.equal(gitTimeLog.formatTime(90), '~1:30');
      assert.equal(gitTimeLog.formatTime(900), '~15:00');
      assert.equal(gitTimeLog.formatTime(9012), '~150:12');
    });
  });

  describe('getMinsFromMessage', function () {
    it('should exist', function () {
      assert(gitTimeLog.getMinsFromMessage);
    });

    it('should get mins from message', function () {
      assert.equal(gitTimeLog.getMinsFromMessage("no time entry"), 0);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~:00"), 0);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~:01"), 1);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~:11"), 11);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~:59"), 59);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~1:11"), 71);
      assert.equal(gitTimeLog.getMinsFromMessage("time ~10:11"), 611);
    });
  });

  describe('totalMinutes', function () {
    it('should exist', function () {
      assert(gitTimeLog.totalMinutes);
    });

    it('should return total time logged for project', function (done) {
      // act
      gitTimeLog.totalMinutes(function (total) {
        assert(total, 'should not be 0');
        done();
      });
    });
  });
});
