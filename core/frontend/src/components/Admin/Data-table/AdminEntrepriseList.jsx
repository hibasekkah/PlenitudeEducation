import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import EntrepriseApi from "../../../services/api/Entreprise";
import {Button} from "@/components/ui/Button";
import { ArrowUpDown, DownloadIcon, FileText } from "lucide-react";
import {toast} from "sonner";
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
        console.log(response.data.data[0].doc_rc);
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
    id: "actions",
    cell: ({ row }) => {
      const {id} = row.original;
 
      return <>
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
                              <AddEntrepriseForm 
                                initialData={row.original} 
                                onFormSubmit={(formValues) => EntrepriseApi.update(row.original.id, formValues)}
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

                    <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                              documents
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Documents</DialogTitle>
                            
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid">
                              <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                  <div className="flex items-center space-x-2">
                                    <a
                                      //key={file.id}
                                      href={`${import.meta.env.VITE_BACKEND_URL}/storage/${data[0].doc_rc}`}
                                      download="Registre de commerce"
                                      className="flex items-center text-sm font-medium hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                       Registre de commerce 
                                    </a>
                                    <span className="text-xs text-gray-500">
                                        {/* ({formatFileSize(file.size)}) */}
                                      </span></div>
                                  </div>
                            </div>
                            <div className="grid gap-3">
                              <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                  <div className="flex items-center space-x-2">
                                    <a
                                      //key={file.id}
                                      href={`${import.meta.env.VITE_BACKEND_URL}/storage/${data[0].doc_status}`}
                                      download="Statuts d'entreprise"
                                      className="flex items-center text-sm font-medium hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                       Statuts d'entreprise 
                                    </a>
                                    <span className="text-xs text-gray-500">
                                        {/* ({formatFileSize(file.size)}) */}
                                      </span></div>
                                  </div>
                            </div>
                            <div className="grid gap-3">
                              <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                  <div className="flex items-center space-x-2">
                                    <a
                                      //key={file.id}
                                      href={`${import.meta.env.VITE_BACKEND_URL}/storage/${data[0].doc_pv}`}
                                      download='Procès verbal'
                                      className="flex items-center text-sm font-medium hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                       Procès verbal 
                                    </a>
                                    <span className="text-xs text-gray-500">
                                        {/* ({formatFileSize(file.size)}) */}
                                      </span></div>
                                  </div>
                            </div>
                            <div className="grid gap-3">
                              <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                  <div className="flex items-center space-x-2">
                                    <a
                                      //key={file.id}
                                      href={`${import.meta.env.VITE_BACKEND_URL}/storage/${data[0].CIN_gerant}`}
                                      download='CIN Gérant'
                                      className="flex items-center  text-sm font-medium hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                      CIN Gérant 
                                    </a>
                                    <span className="text-xs text-gray-500">
                                        {/* ({formatFileSize(file.size)}) */}
                                      </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                              {data[0].files.map((file) => (
                                <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                  <div className="flex items-center space-x-2">
                                    <a
                                    //key={file.id}
                                    href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                                    download={file.file_nom}
                                    className="flex items-center  text-sm font-medium hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                    {file.file_nom} 
                                  </a>
                                    {file.size && (
                                      <span className="text-xs text-gray-500">
                                        {/* ({formatFileSize(file.size)}) */}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
      </>
    },
  },
]


  return <>
      <DataTable columns={AdminEntrepriseColumns} data={data}/>
    </>
}

