/* 
import React from 'react'
import {
    Table,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Snippets from '@/components/Snippets';

type snippets = {
    id: number;
    username: string;
    language: string;
    stdin: string;
    sourceCode: string;
    stdout: string | null;
}
export default async function Entries() {

    const res = await fetch("http://localhost:5000/getAll", { cache: "no-store" })
    let cacheOrNot = await res.json()
    let allSnippets: snippets[] = []
    if (cacheOrNot.db) {
        console.log("from db")
        allSnippets = cacheOrNot.db

    }
    else if (cacheOrNot.redis) {
        console.log("from redis")
        allSnippets = cacheOrNot.redis.map((snippet: string) => JSON.parse(snippet))
        allSnippets.sort((a, b) => a.id - b.id);
    }

   






    return (
        <div className='w-10/12 mx-auto'>
            <Table>
                <TableCaption>All submitted entries</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Username</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>stdin</TableHead>
                        <TableHead className="text-left">Source Code</TableHead>
                        <TableHead className="">stdout</TableHead>

                    </TableRow>
                </TableHeader>
                 <Snippets  data={allSnippets}/>    
                
            </Table>

        </div>
    )
}
 */

import { columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";




export type snippets = {
    createdAt: string;
    id: number;
    username: string;
    language: string;
    stdin: string;
    sourceCode: string;
    stdout: string | null;

}




export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-2 md:mx-auto  py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}



export async function getData() {
    const res = await fetch("http://localhost:5000/getAll", { cache: "no-store" })
    let cacheOrNot = await res.json()
    let allSnippets: snippets[];

    if (cacheOrNot.db) {
        console.log("from db")
        allSnippets = cacheOrNot.db

    }
    else {
        console.log("from redis")
        allSnippets = cacheOrNot.redis.map((snippet: string) => JSON.parse(snippet))
        allSnippets.sort((a, b) => b.id - a.id);
    }

    allSnippets.forEach(snippet => {

        snippet.createdAt = new Date(snippet.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: false,
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        snippet.stdout = snippet.stdout ? removeNonPrintableChars(snippet.stdout) : "waiting"
    });
    return allSnippets
}



function removeNonPrintableChars(str: string) {
    return str.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "");

}

