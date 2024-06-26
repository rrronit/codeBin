import { Job, Worker } from "bullmq";
import Redis from "ioredis";
import Docker from "dockerode";
import { exec } from "child_process";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()






type LanguageExtensions = {
    [key: string]: string;
}


const client = new Redis({
    host: "localhost",
    port: 6380,
    maxRetriesPerRequest: null,
});


const docker = new Docker();

const runCode = async (language: string) => {
    if (language === "c" || language === "c++") {
        language = "cpp";
    }


    try {
        let returnChunks = ""
        const container = await docker.createContainer({
            Image: `${language}-runner`,
            AttachStdout: true,
            AttachStderr: true,

            HostConfig: {
                Binds: [`${__dirname}/Code:/judge`]
            }
        });

        await container.start();

        const logs = await container.logs({
            follow: true,
            stdout: true,
            stderr: true
        });

        logs.on('data', (chunk) => {
            returnChunks += chunk.toString()
        });

        logs.on('error', (err) => {
            console.error('Error reading logs:', err);
        });
        await container.wait();

        //this part was added after submission date because of while true error
        const timeout = setTimeout(async () => {
            await container.remove();
            returnChunks = "Timeout"
        }, 3000);

        clearTimeout(timeout)

        await container.remove();



        return returnChunks

    } catch (err) {
        console.error('Error running container:', err);
    }
};

const work = async (job: Job) => {
    let { id, username, language, stdin, sourceCode } = job.data
    const code = handleInput(sourceCode, stdin)

    const languageExtensions: LanguageExtensions = {
        'javascript': 'js',
        'python': 'py',
        'java': 'java',
        'c++': 'cpp',
        'c': 'c'
    };


    const extension = languageExtensions[language.toLowerCase()];

    const filePath = `${__dirname}/Code/`
    const fileName = filePath + `code.${extension}`; languageExtensions[language.toLowerCase()]

    if (!existsSync(filePath)) {
        mkdirSync(filePath);
    }


    writeFileSync(fileName, code);

    let output = await runCode(language.toLowerCase())


    if (output == "") {
        output = "No output available to print"
    }
    const newSnippet = await prisma.codeSnippet.update({
        data: {
            stdout: output
        },
        where: {
            id: id
        }
    })
    await client.set(`snip:${newSnippet.id}`, JSON.stringify(newSnippet), "EX", 20);

    unlinkSync(fileName)
    const binaryPath = filePath + "code"
    if (existsSync(binaryPath)) {
        unlinkSync(binaryPath)
    }

};

const worker = new Worker("codeQueue", work, {
    connection: client,
    autorun: false,
})
worker.run()









const initialSetup = async () => {

    const images = ["python", "java", "javascript", "cpp"]
    images.map(async image => {
        exec(`docker build -t ${image}-runner Docker/${image}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
        })
    })
    console.log(await prisma.codeSnippet.findMany())

}



const handleInput = (source: string, input: string) => {
    const placeholders = source.match(/\$(\w+)/g);
    const inputData = input.split(",")



    if (placeholders) {

        if (inputData.length !== placeholders.length) {
            console.log("invalid number of codes")
        }
        let idx = 0
        placeholders.forEach(placeholder => {
            source = source.replace(placeholder, inputData[idx])
            idx++
        });
    }
    return source;
}

initialSetup()