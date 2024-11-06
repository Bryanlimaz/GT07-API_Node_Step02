const connection = require('../database/connection');
require('../../models/usersModels');

(async () => {
  try {
    // Testa a conexão com o banco de dados
    await connection.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza os modelos com o banco de dados
    await connection.sync({ alter: true });
    console.log('Sincronização dos modelos concluída com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
  } finally {
    // Encerra a conexão com o banco de dados após a sincronização
    await connection.close();
    console.log('Conexão com o banco de dados encerrada.');
  }
})();
