export const validateEnv = () => {
    const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_NAME', 'DB_PORT', 'PORT'];
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            console.error(`Missing environment variable: ${envVar}`);
            process.exit(1);
        }
    });
};