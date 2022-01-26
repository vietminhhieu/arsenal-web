require("dotenv/config");

const env = {
  port: process.env.PORT || 4000,
  database_connect:
    process.env.DB_CONNECT ||
    "mongodb+srv://vmhieu198:vmhieu198@cluster0.4idy8.mongodb.net/ArsUserInfo?retryWrites=true&w=majority",
  secret_token:
    process.env.SECRET_TOKEN || "arsenalisthegreatestclubintheworld",
  admin_email: process.env.ARS_EMAIL || "arsenalweb1@gmail.com",
  admin_password: process.env.ARS_PASSWORD || "viethieu1982k",
};

module.exports = env;
