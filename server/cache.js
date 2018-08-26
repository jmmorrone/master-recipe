const LRU = require('lru-cache');

const options = {
  max: 30,
  length: (n, key) => (n * 2 + key.length),
  dispose: (key, n) => (n.close()),
  maxAge: 1000 * 60 * 60,
};

const cache = LRU(options);

module.exports = cache;
