import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ParticipantApi from "../../services/api/Participant";
import { useAuth } from "@/provider/authProvider";
import { DownloadIcon } from "lucide-react";
import { Module } from "./Module";
import { Atelier } from "./Atelier";

export function Formation() {
  const { user } = useAuth();
  const [session, setSessionData] = useState([]);

  const handlePlanning = (id) => {
    window.open(`http://localhost:8000/api/planning/${id}`, "_blank");
    };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await ParticipantApi.session(user.id);
        setSessionData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Impossible de récupérer les Sessions :", error);
      }
    };

    fetchSessions();
  }, [user.id]);

  return (
    <div className="m-7">
      <div className="mb-3">
        <h1>Formations</h1>
      </div>
      {session.map((sessionn) => (
        <Card key={sessionn.id}>
          <CardHeader>
            <CardTitle>{sessionn?.formation?.intitule}</CardTitle>
            <CardDescription>{sessionn?.formation?.niveau}</CardDescription>
            <CardAction>
              <Button onClick={() => handlePlanning(sessionn.id)} className='mr-2'>Planning</Button>
              <Dialog>
                <DialogTrigger><Button className='mr-2'>Modules/Ateliers</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Modules/Ateliers</DialogTitle>
                    <DialogDescription>
                      {sessionn?.formation?.modules?.map((module)=>{
                        return (<>
                        <Module module={module}/>
                        </> 
                      );
                        
                      })}

                      {sessionn?.formation?.ateliers?.map((atelier)=>{
                        return (<>
                        <Atelier atelier={atelier}/>
                        </> 
                      );
                        
                      })}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button onClick={() => handlePlanning(sessionn.id)}>Seances</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Objectifs : {sessionn?.formation?.objectifs}</p>
          </CardContent>
          <CardFooter>
            <p>Durée : {sessionn?.formation?.duree} h</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
