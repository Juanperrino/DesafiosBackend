// init project
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
import { initServer, emit } from "./utils/socket.js";
import http from "http";
import bodyParser from "body-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/index.js";
import passport from "./middlewares/passport.js";

const params = minimist(process.argv.slice(2), {
  alias: {
    p: "PORT",
    m: "MODE"
  },
  default: {
    p: 8080,
    m: "fork"
  }
});

const { PORT, MODE } = params

if (MODE === "cluster" && cluster.isPrimary) {
  const length = os.cpus().length;

  for (let i = 0; i < length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker} died`);
  })
} else {

  const app = express();

  app.use(express.json());
  app.use(expressSession({
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 600
    }),
    secret: "shhh",
    resave: true,
    saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set("views", "./views");
  app.set("view engine", "pug");
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", express.static("./static"))
  app.use("/", router);

  app.use((error, req, res, next) => {
    if (error.statusCode) {
      return res.status(error.statusCode).send(`Error ${error.statusCode}`);
    }
    console.log(error);
    res.status(500).json({ error: "Somethings brokes..." });
  })

  // listen for requests :)

  const server = http.createServer(app);
  initServer(server);

  server.listen(PORT, function () {
    console.log("Your app is listening on " + `${process.env.NODE_URL}:${PORT}/`);
    console.log("Environment: " + process.env.NODE_ENV);
  })
}