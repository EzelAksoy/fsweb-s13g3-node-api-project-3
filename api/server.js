const express = require("express");
const user_router = require("./users/users-router");
const { logger } = require("./middleware/middleware");

const server = express();
server.use(express.json());

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use(logger);
server.use("/api/users", user_router);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
