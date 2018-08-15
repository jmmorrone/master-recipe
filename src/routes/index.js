const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.json('Master Recipe');
});

module.exports = router;
