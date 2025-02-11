const mysql = require('mysql')
const dbConfig = {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'projetocrud',
};
    
const connection = mysql.createConnection(dbConfig);
    
connection.connect((err) => {
if (err) {
      console.log('Erro ao conectar ao banco de dados: ' + err);
      return;
}
      console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;