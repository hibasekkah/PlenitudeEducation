import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import {toast} from "sonner";
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";
import ParticipantApi from "../../../services/api/Participant";
import EntrepriseApi from "../../../services/api/Entreprise";
import SessionApi from "../../../services/api/Session";


export default function AffecterParticipantsForm({initialData}){
  console.log(initialData.entreprise.id);
  const [data,setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await EntrepriseApi.participant(initialData.entreprise.id);
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Participants:", error);
      }
    })(); 
  }, [initialData]);

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
    id: "actions",
    cell: ({ row }) => {
      const {id} = row.original;
 
      return (
        <>
        <Button className='bg-emerald-600 hover:bg-emerald-700' onClick={async()=>{
                      try{
                        const deletingLoader = toast.loading('affectation en cours !!')
                        const payload = {
                          'user_id':row.original.id,
                          'session_id':initialData.entreprise.id,
                        }
                        const response = await SessionApi.affecter(id);
                        toast.dismiss(deletingLoader);
                        setData(data.filter((Participant)=>Participant.id !== id));
                        toast.success("Participant affecter avec succès !");}
                        catch(error){
                          toast.error("Erreur lors de l'affectation du Participant.");
                          console.error(error);
                        }
                      }}>ajouter</Button> 
        </>
      )
    },
  },
]


  return <>
      <DataTable columns={AdminParticipantColumns} data={data}/>
    </>
}

