import dotenv from "dotenv";
dotenv.config();

interface ConfigInterface {
    PORT: number,
    POSTGRES_URL?: string,
    BREVO_API_KEY?: string,
    REDIS_URL?: string,
    ACCESS_TOKEN_SECRET?: string,
    REFRESH_TOKEN_SECRET?: string,
    SERVER?: string,
    DATABASE?: string
};

const config:ConfigInterface = {
    PORT: Number(process.env.PORT) || 8000,
    POSTGRES_URL: process.env.POSTGRES_URL || "",
    BREVO_API_KEY: process.env.BREVO_API_KEY || "",
    REDIS_URL: process.env.REDIS_URL || "",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    SERVER: process.env.SERVER || "",
    DATABASE: process.env.DATABASE || ""
};

export default config;