
var assert = {
  equal: function(a,b) {
    if (a != b) {
      throw new Error(`"${a}" != ${b}`);
    }
  }
};

describe('smoke test', function () {
  it('should not explode', function () {
    assert.equal(2 + 2, 4);
  });
});
