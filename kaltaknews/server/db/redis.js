const {createClient} = require("redis");

const redisClient= createClient({
    url: "redis://127.0.0.1.:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.on("connect",()=>{
    console.log("Redis is connecting...");
})

redisClient.on("ready",()=>{
    console.log("Redis Connected and ready to use");
})

 const connectRedis =async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect();
    }
}

module.exports = {redisClient, connectRedis};   