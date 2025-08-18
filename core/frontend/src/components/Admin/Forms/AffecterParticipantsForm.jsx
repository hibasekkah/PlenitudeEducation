import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import {Button} from "@/components/ui/Button";
import {toast} from "sonner";
import { DataTableColumnHeader } from "../../data-table/DataTableColumnHeader";
import EntrepriseApi from "../../../services/api/Entreprise";
import SessionApi from "../../../services/api/Session";

export default function AffecterParticipantsForm({initialData}){
  const [data, setData] = useState([]);
  const [sessions, setSessions] = useState([]);

  const refreshSessions = async () => {
    try {
      const response = await SessionApi.sessions(initialData.id);
      console.log("Sessions:", response.data);
      setSessions(response.data.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions:", error);
      setSessions([]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await EntrepriseApi.participant(initialData.entreprise.id);
        console.log("Participants:", response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des Participants:", error);
        setData([]);
      }
    })(); 

    refreshSessions();
  }, [initialData]);

  const isParticipantAffected = (participantId) => {
    return sessions.some(session => session.user_id === participantId);
  };

  const AdminParticipantColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      displayName: "ID",
    },
    {
      accessorKey: "nom",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      displayName: "Nom",
    },
    {
      accessorKey: "prenom",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prénom" />
      ),
      displayName: "Prénom",
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      displayName: "Email",
    },
    {
      accessorKey: "telephone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Téléphone" />
      ),
      displayName: "Téléphone",
    },
    {
      accessorKey: "entreprise_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Entreprise" />
      ),
      cell: ({ row }) => {
        const { nom } = row.original.entreprise || {};
        return (
          <div className="flex flex-col space-y-2">
            {nom || 'N/A'}
          </div>
        );
      },
      displayName: "Entreprise",
    },
    {
      accessorKey: "specialite_fonction",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fonction" />
      ),
      displayName: "Fonction",
    },
    {
      accessorKey: "statut",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="statut" />
      ),
      displayName: "statut",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id } = row.original;
        const isAffected = isParticipantAffected(id);

        const handleAction = async () => {
          try {
            const loadingMessage = isAffected ? 'Désaffectation en cours...' : 'Affectation en cours...';
            const deletingLoader = toast.loading(loadingMessage);
            
            const payload = {
              'user_id': id,
              'session_id': initialData.id,
            };

            let response;
            if (isAffected) {
              response = await SessionApi.desaffecter(payload); 
            } else {
              response = await SessionApi.affecter(payload);
            }

            toast.dismiss(deletingLoader);
            await refreshSessions();
            
            const successMessage = isAffected 
              ? "Participant désaffecté avec succès !" 
              : "Participant affecté avec succès !";
            toast.success(successMessage);

          } catch (error) {
            toast.dismiss();
            const errorMessage = error?.response?.data?.message || "Une erreur est survenue";
            toast.error(errorMessage);
            console.error("Erreur:", error);
          }
        };

        return (
          <Button 
            className={isAffected 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-emerald-600 hover:bg-emerald-700'
            }
            onClick={handleAction}
          >
            {isAffected ? 'Désaffecter' : 'Affecter'}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={AdminParticipantColumns} data={data} />
    </div>
  );
}