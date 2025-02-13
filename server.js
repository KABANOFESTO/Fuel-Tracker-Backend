// server.js
const http = require("http");
const app = require("./app");
const logger = require("./config/logger");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
