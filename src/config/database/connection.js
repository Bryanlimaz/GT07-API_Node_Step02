const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DRIVER,
    dialectOptions: {
      ssl: {
        require: true,  // Força o uso de SSL
        rejectUnauthorized: false // Permite conexões sem verificação de certificado
      }
    },
    logging: false  // Opcional: desabilita logs SQL para uma clareza maior
  }
);

module.exports = connection;
