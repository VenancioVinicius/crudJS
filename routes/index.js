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

//listar uma pessoa em especifico 
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

//Edição dos dados
router.put('/pessoa/:id', (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;

  let query = 'UPDATE pessoa SET';
  let valores = [];

  for (let campo in atualizacao){
    query += ` ${campo} = ?, `;
    valores.push(atualizacao[campo])
  }

  query = query.slice(0, -2);
  query += ' WHERE id = ?';
  valores.push(id);

  db.query(query, valores, (err, results) => {
    if (err) {
      console.log('Erro ao atualizar: ' + err);
      res.status(500).send('Erro ao atualizar.');
      return;
    }
    res.send('Atualizado dados de pessoa.');
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