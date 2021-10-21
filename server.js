if (process.env.NODE_ENV !== "production") require("dotenv").config();

const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const server = http.createServer(app);

app
  .use(express.static(path.join(__dirname, "/client/build")))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    })
  );

const io = require("socket.io")(server);

require("./db/connect")();
require("./websocket")(io);
require("./auth")(app);

app.use(require("./routes"));

const PORT = process.env.PORT || 4040;

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
