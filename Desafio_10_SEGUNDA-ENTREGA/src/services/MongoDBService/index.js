import mongoose from "mongoose";
import { config } from "../../config/index.js";

const init = async () => {
  try {
    mongoose.connect(config.DATABASES.mongo.url, {
      dbName: config.DATABASES.mongo.dbName,
    });
    console.log("Connected with mongodb");
  } catch (error) {
    console.log(error);
  }
};

export const MongoDBService = {
  init,
};
