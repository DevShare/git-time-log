/* global require, describe, it */

var assert = require("assert"),
    tilde = require("../git-tilde-time");

describe('git-tilde-time', function() {
  it('should exist', function () {
    assert(tilde);
  });
});
