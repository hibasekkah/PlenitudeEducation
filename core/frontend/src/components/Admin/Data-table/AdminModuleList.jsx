import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import { ArrowUpDown, DownloadIcon } from "lucide-react";
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
import ModuleApi from "../../../services/api/Module";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddModuleForm from "../Forms/AddModuleForm";


export default function AdminModuleList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await ModuleApi.all();
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
    accessorKey: "titre",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Titre" />
      )
    },
    displayName : "Titre",
  },
  {
    accessorKey: "duree",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Durée" />
      )
    },
    displayName : "Durée",
  },
  {
    accessorKey: "categorie",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Catégorie" />
      )
    },
    displayName : "Catégorie",
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
    accessorKey: "files", 
    header: "Fichiers",   
    cell: ({ row }) => {
      const files = row.original.files;
      if (!files || files.length === 0) {
        return <span>Aucun fichier</span>;
      }
      return (
        <div className="flex flex-col space-y-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
              download={file.file_nom || 'document'} 
              className="flex items-center text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              {file.file_nom || 'Télécharger'} 
            </a>
          ))}
        </div>
      );
    },
    
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
                        onFormSubmit={(formValues) => ModuleApi.update(row.original.id, formValues)}
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
                        const response = await ModuleApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Module)=>Module.id !== id));
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

