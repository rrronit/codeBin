import { columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import { notFound } from "next/navigation";




export type snippets = {
    createdAt: string;
    id: number;
    username: string;
    language: string;
    stdin: string;
    sourceCode: string;
    stdout: string | null;
}





export default async function Page() {

    let res = await fetch(`${process.env.URL}/getAll`, { cache: "no-store" })
    if (!res.ok) return notFound()
    const data=await res.json()
    let allSnippets: snippets[];


    if (data.db) {
        allSnippets = data.db

    }
    else {
        allSnippets = data.redis.map((snippet: string) => JSON.parse(snippet))
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
    })

    return (
        <div className="container mx-2 md:mx-auto  py-10">
            <DataTable columns={columns} data={allSnippets} />
        </div>
    )
}



function removeNonPrintableChars(str: string) {
    return str.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "");

}

