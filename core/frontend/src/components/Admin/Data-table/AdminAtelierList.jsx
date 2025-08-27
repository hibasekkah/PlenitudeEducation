import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import {toast} from "sonner";
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AtelierApi from "../../../services/api/Atelier";
import AddAtelierForm from "../Forms/AddAtelierForm";


export default function AdminAtelierList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await AtelierApi.all();
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      }
    })(); 
  }, []);

  const  AdminModuleColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="ID" />
      )
    },
    displayName : "ID",
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Type" />
      )
    },
    displayName : "Type",
  },
  {
    accessorKey: "materiels",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Matériels" />
      )
    },
    displayName : "Matériels",
  },
  {
    accessorKey: "observations",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Observations" />
      )
    },
    displayName : "Observations",
  },
  {
    accessorKey: "lieu",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Lieu" />
      )
    },
    displayName : "Lieu",
  },
  {
    accessorKey: "formation_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Formation" />
      )
    },
    cell: ({ row }) => {
      const {intitule} = row.original.formation;
      return (
        <div className="flex flex-col space-y-2">
          {intitule}
        </div>
      );
    },
    displayName : "Formation",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {id} = row.original;
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            
              <Sheet className='m-2'>
                <SheetTrigger asChild>
                  <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                    Editer
                  </DropdownMenuItem>
                </SheetTrigger>
                <SheetContent className="flex flex-col">

                  <SheetHeader>
                    <SheetTitle>Mettre à jour</SheetTitle>
                  </SheetHeader>

                  <div className="flex-grow overflow-y-auto m-1"> 
                    <ScrollArea className="h-full pr-4"> 
                      <AddAtelierForm 
                        initialData={row.original} 
                        onFormSubmit={(formValues) => AtelierApi.update(row.original.id, formValues)}
                      />
                    </ScrollArea>
                  </div>
                </SheetContent>
              </Sheet>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                    Supprimer
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous certain(e) de vouloir continuer ?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={async()=>{
                      try{
                        const deletingLoader = toast.loading('suppression en cours !!')
                        const response = await AtelierApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Atelier)=>Atelier.id !== id));
                        toast.success("Atelier supprimée avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la suppression de l'atelier.");
                          console.error(error);
                        }
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
  return <>
      <DataTable columns={AdminModuleColumns} data={data}/>
    </>
}

