// init project
import express from "express";
import { initServer, emit } from "./socket.js";
import http from "http";
import bodyParser from "body-parser";
import productsRoutes from './routes/products.js';



import * as dotenv from 'dotenv';
dotenv.config();



const app = express();

const PORT = process.env.PORT || 8080


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("./static"))
app.set("views", "./views")
app.set("view engine", "pug")

app.use("/", productsRoutes)

app.use((error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).send(`Error ${error.statusCode}`)
  }
  console.log(error)
  res.status(500).json({ error: "Somethings brokes..." })
})

// listen for requests :)

const server = http.createServer(app)
initServer(server)

server.listen(PORT, function () {
  console.log("Server running on port " + PORT);
})
