import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { AppDataSource } from "./infrastructure/database/data-source";
import router from "./api/routes";
import { setupSwagger } from "./swagger";
import logger from "./utils/logger";
import { validateEnv } from "./config/env";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
validateEnv();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());
app.use("/api", router);

setupSwagger(app);

AppDataSource.initialize()
    .then(async () => {
        logger.info("Connected to PostgreSQL database successfully!");

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        logger.error("Error connecting to the database:", error);
        process.exit(1);
    });
