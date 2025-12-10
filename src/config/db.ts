import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import { User } from "../models/User";
import { Favorite } from "../models/Favorite";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false, 
  models: [User, Favorite],
});