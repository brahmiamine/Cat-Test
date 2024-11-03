import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cat } from "../../domain/entities/Cat";
import { Vote } from "../../domain/entities/Vote";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Cat, Vote],
    subscribers: [],
    migrations: [],
});
