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
import { useAuth } from "@/provider/authProvider";
import ParticipantApi from "../../services/api/Participant";
import { useEffect, useState } from "react";
import {toast} from 'sonner';
import { DownloadIcon } from "lucide-react";


function formatDate(rawDate) {
  if (!rawDate) return "";
  const date = new Date(rawDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export function Seance(){
    const { user } = useAuth();
    const [seances, setSeanceData] = useState([]);
    const [seancesa, setSeanceDataa] = useState([]);
    const [seancesp, setSeanceDatap] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);

    useEffect(() => {
        const fetchSeances = async () => {
        try {
            const response = await ParticipantApi.seance(user.id);
            setSeanceData(response.data.seances_du_jour);
            setSeanceDataa(response.data.seances_avenir);
            setSeanceDatap(response.data.seances_passees);
            console.log(response.data);
        } catch (error) {
            console.error("Impossible de récupérer les Seances :", error);
        }
        };

        fetchSeances();
    }, [user.id]);


    const onSubmit = async (seance) => {
        const loading = toast.loading('en cours');
        try {
        const payload = {
            date: formatDate(new Date()),
            arriver: new Date(),
            seance_id: seance.id,
            user_id: user.id,
        };
        const response = await ParticipantApi.pointe(payload);
        console.log("Présence enregistrée :", response.data);
        toast.success('Présence enregistrée');
        setClickedButtons((prev) => [...prev, seance.id]);
        } catch (error) {
        console.error("Erreur lors de l'enregistrement de la présence :", error);
        toast.error("Erreur lors de l'enregistrement de la présence :", error);
        } finally {
            toast.dismiss(loading)
        }
    };


    return (
        <div className="m-7">
            <div className="mb-3"><h1 className=" text-blue-950 text-xl font-medium">Séance d'aujourd'hui</h1></div>
            {seances.map((seance) => {
                const isClicked = clickedButtons.includes(seance.id);
                if (seance.module) {
                    return (
                        <Card key={seance.id} className='mt-1'>
                            <CardHeader>
                                <CardTitle>Module : {seance.module.titre}</CardTitle>
                                <CardDescription>{seance.session_id.formation?.intitule}</CardDescription>
                                <CardAction><Button onClick={()=>onSubmit(seance)} disabled={isClicked}>{isClicked ? "Présence enregistrée" : "Présent(e)"}</Button></CardAction>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">Du {seance.heure_debut} A {seance.heure_fin} Le {formatDate(seance.date)}</p>
                                <div className="flex flex-col space-y-2">
                                    <h2>support du cours :</h2>
                                <div className="space-y-2">
                                    {seance.module.files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                        <div className="flex items-center space-x-2">
                                        <a
                                            href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                                            download={file.file_nom || 'document'}
                                            className="flex items-center  text-sm font-medium hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                        <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                            {file.file_nom || 'Télécharger'}
                                        </a>
                                        {file.size && (
                                        <span className="text-xs text-gray-500">
                                        </span>
                                            )}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <p>Observations : {seance.Observations}</p>
                            </CardFooter>
                        </Card>
                    );
                } else {
                    return (
                        <Card key={seance.id} className='mt-1'>
                            <CardHeader>
                                <CardTitle>Atelier : {seance.atelier.type}</CardTitle>
                                <CardDescription>{seance.session_id.formation?.intitule}</CardDescription>
                                <CardAction><Button>Présent(e)</Button></CardAction>
                            </CardHeader>
                            <CardContent>
                                <p>Du {seance.heure_debut} A {seance.heure_fin} Le {seance.date} a {seance.atelier.lieu}</p>
                                <p>Materiels : {seance.materiels}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Observations : {seance.Observations}</p>
                            </CardFooter>
                        </Card>
                    );
                }
            })}


        
            <div className="mb-3"><h1 className=" text-blue-950 text-xl font-medium">Séance A venir</h1></div>
            {seances.map((seance) => {
                const isClicked = clickedButtons.includes(seance.id);
                if (seance.module) {
                    return (
                        <Card key={seance.id} className='mt-1'>
                            <CardHeader>
                                <CardTitle>Module : {seance.module.titre}</CardTitle>
                                <CardDescription>{seance.session_id.formation?.intitule}</CardDescription>
                                <CardAction><Button onClick={()=>onSubmit(seance)} disabled={isClicked}>{isClicked ? "Présence enregistrée" : "Présent(e)"}</Button></CardAction>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">Du {seance.heure_debut} A {seance.heure_fin} Le {formatDate(seance.date)}</p>
                                <div className="flex flex-col space-y-2">
                                    <h2>support du cours :</h2>
                                <div className="space-y-2">
                                    {seance.module.files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                        <div className="flex items-center space-x-2">
                                        <a
                                            href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                                            download={file.file_nom || 'document'}
                                            className="flex items-center  text-sm font-medium hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                        <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                            {file.file_nom || 'Télécharger'}
                                        </a>
                                        {file.size && (
                                        <span className="text-xs text-gray-500">
                                        </span>
                                            )}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <p>Observations : {seance.Observations}</p>
                            </CardFooter>
                        </Card>
                    );
                } else {
                    return (
                        <Card key={seance.id} className='mt-1'>
                            <CardHeader>
                                <CardTitle>Atelier : {seance.atelier.type}</CardTitle>
                                <CardDescription>{seance.session_id.formation?.intitule}</CardDescription>
                                <CardAction><Button>Présent(e)</Button></CardAction>
                            </CardHeader>
                            <CardContent>
                                <p>Du {seance.heure_debut} A {seance.heure_fin} Le {seance.date} a {seance.atelier.lieu}</p>
                                <p>Materiels : {seance.materiels}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Observations : {seance.Observations}</p>
                            </CardFooter>
                        </Card>
                    );
                }
            })}

        </div>
        
    );   
  
}