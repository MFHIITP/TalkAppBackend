import express from "express"
import config from "./config.js"
import cors from "cors"
import RateLimiter from "./Middlewares/RateLimiter.middleware.js";
import authRouter from "./Routers/AuthRouter.route.js";
import checkTableExists from "./Utils/CheckTableExists.js";
import checkAccessToken from "./Middlewares/VerifyJWT.middleware.js";
import historyRouter from "./Routers/HistoryRouter.route.js";
import checkEmailMapTable from "./Utils/CheckEmailChatMapTable.utils.js";
import chatsRouter from "./Routers/GetChats.route.js"
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

// app.use(RateLimiter);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser());

await import ("./Utils/PostgresConnection.utils.js");
await import ("./Utils/MongoDB.connection.utils.js");

if(!(await checkTableExists("usersTalkApp"))){
    await import("./PostgresModels/CreateUsersSchema.postgresmodels.js");
}

app.use('/auth', authRouter);

app.use(checkAccessToken);

// protected routes
app.use('/history', checkEmailMapTable, historyRouter);
app.use("/chats", chatsRouter);


app.listen(config.PORT, () => {
    console.log(`Server is running on the port ${config.PORT}`)
})
