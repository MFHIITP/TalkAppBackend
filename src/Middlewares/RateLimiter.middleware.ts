import Limiter from "express-rate-limit";

const RateLimiter = Limiter({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false
})

export default RateLimiter;