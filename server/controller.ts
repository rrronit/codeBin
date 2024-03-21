import type { Request, Response } from "express"
import prisma from "./db"
import Redis from "ioredis"
import { Queue  } from "bullmq";


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



export const a="hello"

export const addSnippet = async (req: Request, res: Response) => {
    const { name, lang, stdin, code } = req.body;

    if (!name || !lang || !stdin || !code) {
        return res.json({ message: "Please provide all details" });
    }

    try {
        const codeSnippet = await prisma.codeSnippet.create({
            data: {
                username: name,
                language: lang,
                stdin,
                sourceCode: code
            }
        });

        const A=await codeQueue.add(`snip:${codeSnippet.id}`, codeSnippet)
       
        await client.set(`snip:${codeSnippet.id}`, JSON.stringify(codeSnippet), "EX", 20);

        console.log(codeSnippet);
        return res.json({ message: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
export const getAllSnippets = async (req: Request, res: Response) => {
    try {
        let codeSnippets = [];

        const keys = await client.keys("snip:*");

        if (keys.length > 1) {
            console.log("from redis");
            const redisValues = await client.mget(keys);
            console.log("send");
            return res.json({ "redis": redisValues });
        }
        else {
            console.log("not redis");

            codeSnippets = await prisma.codeSnippet.findMany({
                orderBy:{
                    id:"desc"
                }
            });
            for (const snippet of codeSnippets) {
                await client.set(`snip:${snippet.id}`, JSON.stringify(snippet), "EX", 20);
            }
            console.log("send");

            return res.json({ "db": codeSnippets });
        }

    } catch (err) {
        console.error("Error fetching snippets:", err);
        return res.status(500).json({ message: "Failed to fetch snippets" });
    }
}












