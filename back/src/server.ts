import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { AppDataSource } from "./infrastructure/database/data-source";
import router from "./api/routes";
import { setupSwagger } from "./swagger";
import logger from "./utils/logger";
import { validateEnv } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { importCats } from "./scripts/importCats";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
validateEnv();

app.use(cors({
    origin: ["http://localhost:4000", "http://3.90.222.223"]
}));

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

setupSwagger(app);

AppDataSource.initialize()
    .then(async () => {
        logger.info("Connected to PostgreSQL database successfully!");
        await importCats();


        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        logger.error("Error connecting to the database:", error);
        process.exit(1);
    });
export default app;