import type { Request, Response } from "express"
import prisma from "./db"
import Redis from "ioredis"
import { Queue  } from "bullmq";



const client=new Redis({
    host:"localhost",
    port:6380,
    maxRetriesPerRequest:null

}) 
const codeQueue = new Queue("codeQueue", {
    connection: client
})




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
                stdin:stdin || " ",
                sourceCode: code
            }
        });

        
        await codeQueue.add(`snip:${codeSnippet.id}`, codeSnippet)
        
        await client.set(`snip:${codeSnippet.id}`, JSON.stringify(codeSnippet), "EX", 200);
        res.json({ message: "Success" });
        
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
            const redisValues = await client.mget(keys);
            return res.json({ "redis": redisValues });
        }
        else {

            codeSnippets = await prisma.codeSnippet.findMany({
                orderBy:{
                    id:"desc"
                }
            });
            for (const snippet of codeSnippets) {
                await client.set(`snip:${snippet.id}`, JSON.stringify(snippet), "EX", 200);
            }

            return res.json({ "db": codeSnippets });
        }

    } catch (err) {
        console.error("Error fetching snippets:", err);
        return res.status(500).json({ message: "Failed to fetch snippets" });
    }
}












