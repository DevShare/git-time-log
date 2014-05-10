/* global require, describe, it */

var assert = require("assert"),
    GitTildeTime = require("../git-tilde-time");

describe('git-tilde-time', function() {
  it('should exist', function () {
    assert(GitTildeTime);
  });

  describe('total', function () {
    it('should return total time logged for project', function () {
      // arrange
      var gitTildeTime = new GitTildeTime(),
          total;

      // act
      total = gitTildeTime.total();

      assert(total, 0);
    });
  });
});
