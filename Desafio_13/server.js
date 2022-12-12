// init project
import express from "express";
import {initServer, emit} from "./socket.js";
import http from "http";
import bodyParser from "body-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/index.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./models/user.js";
import { encryptPassword, isValidPassword } from "./utils.js";


const app = express();

const PORT = process.env.PORT || 8080;

const options = {
  usernameField: "email"
}

passport.use("login", new LocalStrategy(options, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({email})
    console.log(user);
      if(!user){
        console.log(`El usuario ${email} no fue encontrado`);
        return done(null, false, {message: `El usuario ${email} no fue encontrado`});
      }
      if(!isValidPassword(password, user.password)){
        console.log("Contraseña invalida");
        return done(null, false, {message: "Contraseña invalida"})
      }
    done(null, user);
  } catch (error) {
    console.log("Error in login\n", error.message);
    done(error)
  }
}))

passport.use("register", new LocalStrategy(options, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({email})
      if(user){
        console.log(`El usuario ${email} ya existe`);
        return done(null, false, {message: `El Usuario ${email} ya existe`});
      }
      const newUser = {
        email,
        password: encryptPassword(password)
      };
    const created = await UserModel.create(newUser);
    console.log(created);
    console.log(`User ${email} has succesfully registered`);
    done(null, created)
  } catch (error) {
    console.log("Error in register\n", error.message);
    done(error)
  }
}))

passport.serializeUser((user, done) => {
  console.log(`serialize user -> user ${user}`);
  done(null, user.email);
})

passport.deserializeUser(async (email, done) => {
  console.log(`deserialize user -> user ${email}`);
  try {
    done(null, await UserModel.findOne({email}));
  } catch (error) {
    done(error);
  }
})

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
app.use(express.static("./static"));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.use((error, req, res, next) => {
  if(error.statusCode){
    return res.status(error.statusCode).send(`Error ${error.statusCode}`);
  }
  console.log(error);
  res.status(500).json({error: "Somethings brokes..."});
})

// listen for requests :)

const server = http.createServer(app);
initServer(server);

server.listen(PORT, function() {
  console.log("Your app is listening on port " + PORT);
  console.log("Environment: " + process.env.NODE_ENV);
})
