import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import ParticipantApi from "../../services/api/Participant";
import { useAuth } from "@/provider/authProvider";

export function Historique(){
    const { user } = useAuth();
    const [session, setSessionData] = useState([]);

    const handlePlanning = (id) => {
        window.open(`http://localhost:8000/api/planning/${id}`, "_blank");
        };

    useEffect(() => {
        const fetchSessions = async () => {
        try {
            const response = await ParticipantApi.sessionT(user.id);
            setSessionData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error("Impossible de récupérer les Sessions :", error);
        }
        };

        fetchSessions();
    }, [user.id]);

    return <>
        <div className="m-7">
            <div className="mb-3"><h1 >Formations Terminées</h1></div>
            { session ?
                session.map((sessionn) => (
                    <Card key={sessionn.id}>
                    <CardHeader>
                        <CardTitle>{sessionn?.formation?.intitule}</CardTitle>
                        <CardDescription>{sessionn?.formation?.niveau}</CardDescription>
                        <CardAction>
                        {/* ✅ Utiliser une fonction fléchée pour éviter exécution immédiate */}
                        <Button onClick={() => handlePlanning(sessionn.id)}>Attestation</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>Objectifs : {sessionn?.formation?.objectifs}</p>
                    </CardContent>
                    <CardFooter>
                        <p>Durée : {sessionn?.formation?.duree}</p>
                    </CardFooter>
                    </Card>
                ))
            :<p>Aucun Formation</p>
        }
            
        </div>    
        
    </>
}