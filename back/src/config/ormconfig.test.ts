import { DataSource } from "typeorm";
import { Cat } from "../domain/entities/Cat";
import { Vote } from "../domain/entities/Vote";

export const testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Cat, Vote],
    logging: false,
});
