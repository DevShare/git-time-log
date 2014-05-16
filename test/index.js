/* global require, describe, it */

var assert = require("assert"),
    GitTimeLog = require("../git-time-log");

describe('git-time-log', function() {
  it('should exist', function () {
    assert(GitTimeLog);
  });

  describe('total', function () {
    it('should return total time logged for project', function () {
      // arrange
      var GitTimeLog = new GitTimeLog(),
          total;

      // act
      total = GitTimeLog.total();

      assert(total, 0);
    });
  });
});
