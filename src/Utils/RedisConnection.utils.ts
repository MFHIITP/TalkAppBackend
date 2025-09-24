import Redis from "ioredis";
import config from "../config.js";

// const redis = new Redis(config.REDIS_URL || "", {
//     maRetriesPerRequest: null
// })

const redis = new Redis({
    host: "172.30.48.184",
    port: 6379
})

export default redis;