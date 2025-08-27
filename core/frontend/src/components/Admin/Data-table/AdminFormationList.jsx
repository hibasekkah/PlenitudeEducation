import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import {toast} from "sonner";
import { MoreHorizontal } from "lucide-react"
import { format } from 'date-fns';


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
import FormationApi from "../../../services/api/Formation";
import AddFormationForm from "../Forms/AddFormationForm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";


export default function AdminFormationList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await FormationApi.all();
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      }
    })(); 
  }, []);


  const  AdminFormationColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="ID" />
          )
        },
    displayName:"ID",
  },
  {
    accessorKey: "intitule",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Intitulé" />
          )
        },
    displayName:"Intitulé",
  },
  {
    accessorKey: "duree",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Durée" />
          )
        },
    displayName:"Durée",
  },
  {
    accessorKey: "cout",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Cout" />
          )
        },
    displayName:"Cout",
  },
  {
    accessorKey: "categorie",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Catégorie" />
          )
        },
    displayName:"Catégorie",
  },
  {
    accessorKey: "niveau",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Niveau" />
          )
        },
    displayName:"Niveau",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="La date de création" />
          )
        },
    displayName:"La date de création",
    cell:({row}) => {
      const date = format(row.original.created_at,'dd/MM/yyyy HH:mm')
      return (
        <div className="flex flex-col space-y-2">
          {date}
        </div>
      );
    }
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
                    Editer
                  </DropdownMenuItem>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>Mettre à jour la formation</SheetTitle>
                    <SheetDescription>
                      Modifiez les informations ci-dessous et cliquez sur "Mettre à jour" lorsque vous avez terminé.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex-grow overflow-y-auto m-1"> 
                    <ScrollArea className="h-full pr-4"> 
                      <AddFormationForm 
                        initialData={row.original} 
                        onFormSubmit={(formValues) => FormationApi.update(row.original.id, formValues)}
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async()=>{
                      try{
                        const deletingLoader = toast.loading('suppression en cours !!')
                        const response = await FormationApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((formation)=>formation.id !== id));
                        toast.success("Formation supprimée avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la suppression de la formation.");
                          console.error(error);
                        }
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            
            
            {/* <DropdownMenuItem>ateliers</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


  return <>
      <DataTable columns={AdminFormationColumns} data={data}/>
    </>
}

