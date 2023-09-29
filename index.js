const http = require('http');
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(
      `Weather Application started successfully on PORT ${process.env.PORT}`
    );
  });