const app = require('./app');
const { port }  = require('./config/dotenvConfig');


// Inicializador do Servidor
app.listen(port, () => {
  console.log(`O server está rodando na porta -> http://localhost:${port}`);
});
