import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import { ArrowUpDown, DownloadIcon, UserRound } from "lucide-react";
import {toast} from "sonner";
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";
import SessionApi from "../../../services/api/Session";



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
import AddModuleForm from "../Forms/AddModuleForm";
import ParticipantApi from "../../../services/api/Participant";
import { EditParticipantForm } from "../Forms/EditParticipantForm";


export default function AdminParticipantList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await ParticipantApi.all();
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Participants:", error);
      }
    })(); 
  }, []);

  const  AdminParticipantColumns = [
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
    accessorKey: "photo_profile",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Photo" />
      )
    },
    cell: ({ row }) => {
      return (
        row.original.photo_profile ?
        <img 
            src={`${import.meta.env.VITE_BACKEND_URL}/storage/${row.original.photo_profile}`}
            className="w-20 h-20 rounded-full object-cover"
            alt="user photo" 
            />: <UserRound  className="w-20 h-20 rounded-full object-cover"/>)
    },
    displayName : "Photo",
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nom" />
      )
    },
    displayName : "Nom",
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Prénom" />
      )
    },
    displayName : "Prénom",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Email" />
      )
    },
    displayName : "Email",
  },
  {
    accessorKey: "telephone",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Téléphone" />
      )
    },
    displayName : "Téléphone",
  },
  {
    accessorKey: "entreprise_id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Entreprise" />
      )
    },
    cell: ({ row }) => {
      const {nom} = row.original.entreprise;
      return (
        <div className="flex flex-col space-y-2">
          {nom}
        </div>
      );
    },
    displayName : "Entreprise",
  },
  {
    accessorKey: "specialite_fonction",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Fonction" />
      )
    },
    displayName : "Fonction",
  },
  {
    accessorKey: "statut",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Statut" />
      )
    },
    displayName : "Statut",
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
                      <EditParticipantForm 
                        initialData={row.original} 
                      />
                    </ScrollArea>
                  </div>
                </SheetContent>
              </Sheet>
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
                        const response = await ParticipantApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Participant)=>Participant.id !== id));
                        toast.success("Participant supprimée avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la suppression du Participant.");
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
      <DataTable columns={AdminParticipantColumns} data={data}/>
    </>
}

