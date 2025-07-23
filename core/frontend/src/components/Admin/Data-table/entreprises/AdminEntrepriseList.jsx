import { useEffect, useState } from "react";
import { DataTable } from "../../../data-table/DataTable";
import EntrepriseApi from "../../../../services/api/Entreprise";
import {Button} from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import {toast} from "sonner";
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
import AddEntrepriseForm from "../../Forms/AddEntrepriseForm";


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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom de l'entreprise
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "secteur",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Secteur d'activité
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "SIRET",
    header: "SIRET",
  },
  {
    accessorKey: "IF",
    header: "IF",
  },
  {
    accessorKey: "CNSS",
    header: "CNSS",
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
  },
  {
    accessorKey: "capital",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capital
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "priode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Période de budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "debut_period",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Début de période
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fin_period",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fin de période
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          La date de création
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {id} = row.original;
 
      return <>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Edit</Button>
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
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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

