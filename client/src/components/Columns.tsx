"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button";
import { snippets } from "@/app/entries/page";


export const columns: ColumnDef<snippets>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                createdAt
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "language",
        header: "Language",
    },
    {
        accessorKey: "stdin",
        header: "stdin",
    },
    {
        accessorKey: "sourceCode",
        header: "sourceCode",
    },
    {
        accessorKey: "stdout",
        header: "stdout",
    },

]
