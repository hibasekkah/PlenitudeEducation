import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { DataTablePagination } from "./DataTablePagination"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Settings2, Filter } from "lucide-react"

export function DataTable({columns, data}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [selectedFilterColumn, setSelectedFilterColumn] = useState(null)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const filterableColumns = table
    .getAllColumns()
    .filter(column => column.getCanFilter() && column.id !== 'actions')

  return (
    <>
    <div>
    <div className="flex items-center py-4 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
              >
                <Filter className="h-4 w-4 mr-2" />
                {selectedFilterColumn 
                  ? selectedFilterColumn.columnDef.displayName || selectedFilterColumn.id
                  : "Choisir colonne"
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Filtrer par colonne</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterableColumns.map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => setSelectedFilterColumn(column)}
                  className="capitalize"
                >
                  {column.columnDef.displayName || column.id}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            placeholder={selectedFilterColumn 
              ? `Filtrer par ${selectedFilterColumn.columnDef.displayName || selectedFilterColumn.id}...`
              : "Sélectionnez d'abord une colonne"
            }
            value={(selectedFilterColumn?.getFilterValue()) ?? ""}
            onChange={(event) =>
              selectedFilterColumn?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            disabled={!selectedFilterColumn}
          /> 

          <DataTableViewOptions table={table} />
      </div>
      </div>
      
    <div className="overflow-hidden rounded-md border">
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div></>
  )
}