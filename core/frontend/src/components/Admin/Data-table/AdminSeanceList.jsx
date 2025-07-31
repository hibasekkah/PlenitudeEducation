import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import { DownloadIcon } from "lucide-react";
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
import SessionApi from "../../../services/api/Session";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddModuleForm from "../Forms/AddModuleForm";


export default function AdminSeanceList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await SessionApi.all();
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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
    displayName : "Date",
  },
  {
    accessorKey: "heure_debut",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Debut" />
      )
    },
    displayName : "Debut",
  },
  {
    accessorKey: "heure_fin",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Fin" />
      )
    },
    displayName : "Fin",
  },
  {
    accessorKey: "etat",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Etat" />
      )
    },
    displayName : "Etat",
  },
  {
    accessorKey: "Observations",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Observations" />
      )
    },
    displayName : "Observations",
  },
  {
    accessorKey: "Session_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Formation" />
      )
    },
    displayName : "Formation",
  },
  {
    accessorKey: "Session_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Entreprise" />
      )
    },
    displayName : "Entreprise",
  },
  {
    accessorKey: "module_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Module" />
      )
    },
    displayName : "Module",
  },
  {
    accessorKey: "atelier_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Atelier" />
      )
    },
    displayName : "Atelier",
  },
  {
    accessorKey: "formateur_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Formateur" />
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
    displayName : "Formateur",
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
            
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                    editer
                  </DropdownMenuItem>
                </SheetTrigger>
                <SheetContent className="flex flex-col">

                  <SheetHeader>
                    <SheetTitle>Mettre à jour</SheetTitle>
                  </SheetHeader>

                  <div className="flex-grow overflow-y-auto m-1"> 
                    <ScrollArea className="h-full pr-4"> 
                      <AddModuleForm 
                        initialData={row.original} 
                        onFormSubmit={(formValues) => SessionApi.update(row.original.id, formValues)}
                      />
                    </ScrollArea>
                  </div>
                </SheetContent>
              </Sheet>
            <DropdownMenuSeparator/>
              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                    supprimer
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
                        const response = await SessionApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Session)=>Session.id !== id));
                        toast.success("Module supprimée avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la suppression du module.");
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

