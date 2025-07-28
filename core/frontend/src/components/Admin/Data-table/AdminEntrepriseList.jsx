import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import EntrepriseApi from "../../../services/api/Entreprise";
import {Button} from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import {toast} from "sonner";
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
import AddEntrepriseForm from "../Forms/AddEntrepriseForm";
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";


export default function AdminEntrepriseList(){
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await EntrepriseApi.all();
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
      }
    })(); 
  }, []);

  const  AdminEntrepriseColumns = [
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
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Nom de l'entreprise" />
      )
    },
    displayName:"Nom de l'entreprise",
  },
  {
    accessorKey: "secteur",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Secteur d'activité" />
      )
    },
    displayName:"Secteur d'activité",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Email" />
      )
    },
    displayName:"Email",
  },
  {
    accessorKey: "telephone",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Téléphone" />
      )
    },
    displayName:"Téléphone",
  },
  {
    accessorKey: "SIRET",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="SIRET" />
      )
    },
    displayName:"SIRET",
  },
  {
    accessorKey: "IF",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="IF" />
      )
    },
    displayName:"IF",
  },
  {
    accessorKey: "CNSS",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="CNSS" />
      )
    },
    displayName:"CNSS",
  },
  {
    accessorKey: "adresse",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Adresse" />
      )
    },
    displayName:"Adresse",
  },
  {
    accessorKey: "capital",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Capital" />
      )
    },
    displayName:"Capital",
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Budget" />
      )
    },
  },
  {
    accessorKey: "priode",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Période" />
      )
    },
    displayName:"Période",
  },
  {
    accessorKey: "debut_period",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de début" />
      )
    },
    displayName:"Date de début",
  },
  {
    accessorKey: "fin_period",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date de fin" />
      )
    },
    displayName:"Date de fin",
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
 
      return <>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Editer</Button>
          </SheetTrigger>
          
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Mettre à jour l'entreprise</SheetTitle>
              <SheetDescription>
                Modifiez les informations ci-dessous et cliquez sur "Mettre à jour" lorsque vous avez terminé.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-grow overflow-y-auto"> 
              <ScrollArea className="h-full pr-4"> 
                <AddEntrepriseForm 
                  initialData={row.original} 
                  onFormSubmit={(formValues) => EntrepriseApi.update(row.original.id, formValues)}
                />
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
        <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button variant={'destructive'} size={'sm'}>Delete</Button>
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
                  const response = await EntrepriseApi.delete(id);
                  toast.dismiss(deletingLoader);
                  setData(data.filter((entreprise)=>entreprise.id !== id));
                  toast.success("Entreprise supprimée avec succès !");}
                  catch(error){
                    toast.error("Erreur lors de la suppression de l'entreprise.");
                    console.error(error);
                  }
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialog>
      </>
    },
  },
]


  return <>
      <DataTable columns={AdminEntrepriseColumns} data={data}/>
    </>
}

