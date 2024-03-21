
"use client"

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { TablePagination } from "./TablePagination"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const fetchDataAndUpdate = () => {

        
        table.getRowModel().rows.map(row=>{
            row.getVisibleCells().map(cell=>{
                
                flexRender(cell.column.columnDef.cell,cell.getContext())

            })
        })
        
    };
    fetchDataAndUpdate()
  /*   useEffect(() => {
        const intervalId = setInterval(fetchDataAndUpdate, 5000); 
        return () => clearInterval(intervalId); 
    }, []); */

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter username..."
                    value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("username")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>

                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => {




                                        if (cell.column.id === "sourceCode") {

                                            const sourceCodeContent = cell.getValue()

                                            return (
                                                <TableCell key={cell.id}>
                                                    {/* @ts-ignore */}

                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <div className="bg-gray-900 w-[400px] text-left   p-2 h-[140px] overflow-auto scrollbar ">
                                                                <pre>
                                                                    {/* @ts-ignore */}
                                                                    {sliceCode(sourceCodeContent)}
                                                                </pre>
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Code</DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="bg-gray-900 text-left  w-[400px]   p-2  overflow-auto scrollbar ">
                                                                        <pre>
                                                                            {/* @ts-ignore */}
                                                                            {sourceCodeContent}
                                                                        </pre>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell key={cell.id}>
                                                    <div className={cn({ "w-[250px] h-[140px] text-left overflow-auto scrollbar": cell.column.id === "stdout" })}>
                                                        <pre>
                                                            {(flexRender(cell.column.columnDef.cell, cell.getContext()))}
                                                        </pre>
                                                    </div>
                                                </TableCell>
                                            )
                                        }
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination table={table} />
        </div>

    )
}


const sliceCode = (code: string) => {
    return code.length > 100 ? code.substring(0, 100) + "..." : code
}

