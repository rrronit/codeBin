const {Queue}=require("bullmq")
const Redis= require("ioredis")

/*  const client = new Redis({
    host:"us1-new-shark-37643.upstash.io",
    password:"b1aebdc65c304ecdbdb6b8b51115c057",
    port:37643,
    maxRetriesPerRequest:null,
    tls:{}
});  */

const client=new Redis({
    host:"localhost",
    port:6380,
    maxRetriesPerRequest:null

}) 
const codeQueue = new Queue("codeQueue", {
    connection: client
})

const init=async()=>{

    const A=await codeQueue.add(`k`,{
            username: "ronit",
            language: "python",
            stdin: "",
            sourceCode: `print("Heobjjhghkjhkh, Python!")
            `,})
}

init()



