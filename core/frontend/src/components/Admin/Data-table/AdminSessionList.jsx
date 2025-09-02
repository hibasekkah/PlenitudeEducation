import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import {toast} from "sonner";
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";
import SessionApi from "../../../services/api/Session";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import AddSessionForm from "../Forms/AddSessionForm";
import { SusSession } from "../Forms/SusSession";
import { AnnulSession } from "../Forms/AnnulSession";
import AffecterParticipantsForm from "../Forms/AffecterParticipantsForm";


export default function AdminSessionList(){

  const handlePlanning = (id) => {
    window.open(`http://localhost:8000/api/planning/${id}`, "_blank");
    };

  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await SessionApi.all();
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Sessions:", error);
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
    accessorKey: "date_debut",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de début" />
      )
    },
    displayName : "Date de début",
    cell: ({ getValue }) => {
      const rawDate = getValue();
      if (!rawDate) return "";
      
      const date = new Date(rawDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
  {
    accessorKey: "date_fin",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de fin" />
      )
    },
    displayName : "Date de fin",
    cell: ({ getValue }) => {
    const rawDate = getValue();
    if (!rawDate) return "";
    
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
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
    accessorKey: "formation.intitule",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Formation" />
      )
    },
    cell: ({ row }) => {
      const {intitule} = row.original?.formation;
      console.log(intitule);
      return (
        intitule? <div className="flex flex-col space-y-2">{intitule}</div>:
        <div className="flex flex-col space-y-2">
          
        </div>
      );
    },
    displayName : "Formation",
  },
  {
    accessorKey: "entreprise.nom",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Entreprise" />
      )
    },
    cell: ({ row }) => {
      const nom = row.original?.entreprise?.nom;
      return (
        <div className="flex flex-col space-y-2">
          {nom || '-'}
        </div>
      );
    },
    displayName: "Entreprise",
  },
  {
  accessorKey: "statut",
  header: ({ column }) => {
    return (
      <DataTableColumnHeader column={column} title="Statut" />
    )
  },
  cell: ({ row }) => {
    const dateDebut = new Date(row.original.date_debut);
    const dateFin = new Date(row.original.date_fin);
    const maintenant = new Date();
    const etat = row.original.etat;
    
    let statut = "";
    let className = "";
    
    if (etat === "suspendue") {
      statut = "Suspendue";
      className = "bg-orange-100 text-orange-800 border-orange-300";
    } else if (etat === "annulée" || etat === "annuler") {
      statut = "Annulée";
      className = "bg-red-100 text-red-800 border-red-300";
    } else {
      if (maintenant < dateDebut) {
        statut = "Planifiée";
        className = "bg-blue-100 text-blue-800 border-blue-300";
      } else if (maintenant >= dateDebut && maintenant <= dateFin) {
        statut = "En cours";
        className = "bg-yellow-100 text-yellow-800 border-yellow-300";
      } else {
        statut = "Terminée";
        className = "bg-green-100 text-green-800 border-green-300";
      }
    }
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
        {statut}
      </div>
    );
  },
  filterFn: (row, id, value) => {
    const dateDebut = new Date(row.original.date_debut);
    const dateFin = new Date(row.original.date_fin);
    const maintenant = new Date();
    const etat = row.original.etat;
    
    let statut = "";
    
    if (etat === "suspendue") {
      statut = "Suspendue";
    } else if (etat === "annulée" || etat === "annuler") {
      statut = "Annulée";
    } else {
      if (maintenant < dateDebut) {
        statut = "Planifiée";
      } else if (maintenant >= dateDebut && maintenant <= dateFin) {
        statut = "En cours";
      } else {
        statut = "Terminée";
      }
    }
    
    return statut.toLowerCase().includes(value.toLowerCase());
  },
  displayName: "Statut",
},
  {
    accessorKey: "raison_sus",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Raison suspension" />
      )
    },
    displayName : "Raison suspension",
  },
  {
    accessorKey: "raison_annulation",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Raison annulation" />
      )
    },
    displayName : "Raison annulation",
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
                    <SheetTitle>Mettre à jour</SheetTitle>
                  </SheetHeader>

                  <div className="flex-grow overflow-y-auto m-1"> 
                    <ScrollArea className="h-full pr-4"> 
                      <AddSessionForm 
                        initialData={row.original} 
                        onFormSubmit={(formValues) => SessionApi.update(row.original.id, formValues)}
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
                        const response = await SessionApi.delete(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Session)=>Session.id !== id));
                        toast.success("Session supprimée avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la suppression du Session.");
                          console.error(error);
                        }
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

                  <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                            Suspendre
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Suspendre</DialogTitle>
                            <DialogDescription>
                              Indiquer la raison
                            </DialogDescription>
                          </DialogHeader>
                          <SusSession
                            initialData={row.original} 
                            onFormSubmit={(id, values) => SessionApi.sus(id, values)} 
                          />
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                            Annuler
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Annuler la session</DialogTitle>
                            <DialogDescription>
                              Indiquer la raison
                            </DialogDescription>
                          </DialogHeader>
                          <AnnulSession
                              initialData={row.original} 
                              onFormSubmit={(id, values) => SessionApi.annuler(id, values)} 
                            />
                        </DialogContent>
                    </Dialog>

                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                    Reactiver
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
                        const deletingLoader = toast.loading('reactivation en cours !!')
                        const response = await SessionApi.reactiver(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Session)=>Session.id !== id));
                        toast.success("reactiver avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de la reactivation du session.");
                          console.error(error);
                        }
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                            Participants
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[90vw]">
                          <DialogHeader>
                            <DialogTitle>Ajouter des participants</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                          </DialogHeader>
                          <AffecterParticipantsForm initialData={row.original}/>
                        </DialogContent>
                    </Dialog>
                    <DropdownMenuItem onClick={() => handlePlanning(id)}>Planning</DropdownMenuItem>
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

