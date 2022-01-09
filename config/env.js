require("dotenv/config");

module.exports = {
  port: process.env.PORT,
  database_connect: process.env.DB_CONNECT,
  secret_token: process.env.SECRET_TOKEN,
  admin_email: process.env.ARS_EMAIL,
  admin_password: process.env.ARS_PASSWORD,
};
