var express = require('express');
var router = express.Router();
const db = require("../db");

router.get('/pessoas', (req, res) => {
  const query = 'SELECT * FROM pessoa';
  db.query(query, (err, results) => {
    if (err) {
      console.log('Erro ao executar consulta: ' + err);
      res.status(500).send('Erro ao executar consulta.');
      return;
    }
    res.json(results);
  });
});

module.exports = router;