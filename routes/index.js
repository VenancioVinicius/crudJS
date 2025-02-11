var express = require('express');
var router = express.Router();
const db = require("../db");

//create de pessoa
router.post('/pessoa', (req, res) => {
  const {nome, email, nascimento} = req.body;

  const query = 'INSERT INTO pessoa(nome, email, nascimento) VALUES (?, ?, ?)';
  db.query(query, [nome, email, nascimento], (err, results) => {
    if (err) {
      console.log('Erro ao inserir: ' + err);
      res.status(500).send('Erro ao inserir.');
      return;
    }
    res.send('Usuário inserido com sucesso!');
  });
});

//listar um em especifico 
router.get('/pessoa/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM pessoa WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.log('Erro ao consultar uma pessoa: ' + err);
      res.status(500).send('Erro ao consultar uma pessoa.');
      return;
    }
    res.json(results);
  });
});

//listar todas as pessoas
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