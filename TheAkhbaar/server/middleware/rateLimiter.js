const {rateLimit} =require('express-rate-limit');
const {RedisStore}=require('rate-limit-redis');
const {redisClient}=require('../db/redis');

const createRedisStore = (prefix) => {
    return new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix,
    });
};

const createRateLimiters=()=>{
    if(!redisClient.isReady){
        throw new Error("Cannot Initialize Rate Limiters: Redis is not ready.")
    }

const generalLimiter=rateLimit({
    windowMs:10*60*1000,
    limit:50,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    store:createRedisStore("rate-limit:general:"),
    message:{
        success:false,
        message:"Too many requests. Please try again later.",
    }
});

const aiChatLimiter=rateLimit({
    windowMs:10*60*1000,
    limit:25,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    store:createRedisStore("rate-limit:aiChat:"),
    message:{
        success:false,
        message:"Too many AI Chat requests. Please try again later."
    }
})

const aiSummaryLimiter=rateLimit({
    windowMs:10*60*1000,
    limit:25,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    store:createRedisStore("rate-limit:aiSummary:"),
    message:{
        success:false,
        message:"Too many AI Summary requests. Please try again later."
    }
})

return {
    generalLimiter,aiChatLimiter,aiSummaryLimiter
}
}
module.exports={createRateLimiters};