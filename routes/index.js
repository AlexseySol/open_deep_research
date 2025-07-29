const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/current-user', authMiddleware, (req, res) => {
  res.json({ identity: req.user.identity });
});

module.exports = router;
