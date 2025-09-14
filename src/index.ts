import express from "express"
import config from "./config.js"
import cors from "cors"
import RateLimiter from "./Middlewares/RateLimiter.middleware.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

app.use(RateLimiter);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.listen(config.PORT, () => {
    console.log(`Server is running on the port ${config.PORT}`)
})
