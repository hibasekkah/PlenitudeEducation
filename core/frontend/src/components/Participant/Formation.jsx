import {
  Card,
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
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ParticipantApi from "../../services/api/Participant";
import { useAuth } from "@/provider/authProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Module } from "./Module";
import { Atelier } from "./Atelier";
import { Seances } from "./Seances";
import { Calendar, Clock, Target, BookOpen, Settings, FileDown, Loader2 } from "lucide-react";
import { toast } from 'sonner';

export function Formation() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingPlanningId, setDownloadingPlanningId] = useState(null);

  const handlePlanning = async (id) => {
    try {
      setDownloadingPlanningId(id);
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      window.open(`http://localhost:8000/api/planning/${id}`, "_blank");
      toast.success("Planning téléchargé avec succès");
    } catch (error) {
      toast.error("Erreur lors du téléchargement du planning");
      console.error("Erreur téléchargement planning:", error);
    } finally {
      setDownloadingPlanningId(null);
    }
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return "Date non disponible";
    try {
      const date = new Date(rawDate);
      if (isNaN(date.getTime())) return "Date invalide";
      
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Date invalide";
    }
  };

  const calculateProgress = (dateDebut, dateFin) => {
    if (!dateDebut || !dateFin) return 0;
    
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  const getStatusBadge = (dateDebut, dateFin) => {
    const now = new Date();
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    
    if (now < start) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">À venir</span>;
    } else if (now > end) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Terminée</span>;
    } else {
      return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">En cours</span>;
    }
  };

  const getModuleNames = (modules) => {
    if (!modules || modules.length === 0) return [];
    return modules.map(module => module.titre || 'Module sans titre').slice(0, 3);
  };

  const getAtelierNames = (ateliers) => {
    if (!ateliers || ateliers.length === 0) return [];
    return ateliers.map(atelier => atelier.type || 'Atelier sans type').slice(0, 3);
  };

  const createContentMapping = (session) => {
    const mapping = {
      modules: {},
      ateliers: {}
    };

    if (session?.formation?.modules) {
      session.formation.modules.forEach(module => {
        mapping.modules[module.id] = {
          titre: module.titre || 'Module sans titre',
          description: module.description || '',
          duree: module.duree || 0
        };
      });
    }

    if (session?.formation?.ateliers) {
      session.formation.ateliers.forEach(atelier => {
        mapping.ateliers[atelier.id] = {
          type: atelier.type || 'Atelier sans type',
          description: atelier.description || '',
          duree: atelier.duree || 0
        };
      });
    }

    return mapping;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user?.id) {
        setError("Utilisateur non identifié");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await ParticipantApi.session(user.id);
        setSessions(response.data.data || []);
      } catch (error) {
        console.error("Impossible de récupérer les Sessions :", error);
        setError("Erreur lors du chargement des formations");
        toast.error("Impossible de charger vos formations");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-blue-950 text-2xl font-medium mb-2">Formations</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Chargement de vos formations...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-blue-950 text-2xl font-medium mb-2">Formations</h1>
        </div>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-600 mb-2">⚠️ Erreur</div>
              <p className="text-gray-600">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty state
  if (!sessions || sessions.length === 0) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-blue-950 text-2xl font-medium mb-2">Formations</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation</h3>
              <p className="text-gray-600">Vous n'êtes inscrit à aucune formation pour le moment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="m-7">
      <div className="mb-6">
        <h1 className="text-blue-950 text-2xl font-medium mb-2">Mes Formations</h1>
        <p className="text-gray-600">Gérez et suivez vos formations en cours</p>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session) => {
          const progress = calculateProgress(session.date_debut, session.date_fin);
          const hasModules = session?.formation?.modules && session.formation.modules.length > 0;
          const hasAteliers = session?.formation?.ateliers && session.formation.ateliers.length > 0;
          
          const moduleNames = getModuleNames(session?.formation?.modules);
          const atelierNames = getAtelierNames(session?.formation?.ateliers);
          
          const contentMapping = createContentMapping(session);
          
          return (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {session?.formation?.intitule || "Formation sans titre"}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {session?.formation?.niveau || "Niveau non spécifié"}
                      </span>
                      {getStatusBadge(session.date_debut, session.date_fin)}
                    </CardDescription>

                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button 
                    onClick={() => handlePlanning(session.id)} 
                    variant="outline"
                    size="sm"
                    disabled={downloadingPlanningId === session.id}
                    className="flex items-center gap-2"
                  >
                    {downloadingPlanningId === session.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4" />
                    )}
                    Planning
                  </Button>

                  {(hasModules || hasAteliers) && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Modules & Ateliers
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Modules & Ateliers - {session?.formation?.intitule}
                          </DialogTitle>
                          <DialogDescription>
                            Consultez le détail des modules et ateliers de cette formation
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[500px] w-full rounded-md p-4">
                          {hasModules && (
                            <div className="mb-6">
                              <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
                                <BookOpen className="h-5 w-5" />
                                Modules ({session.formation.modules.length})
                              </h3>
                              <div className="grid gap-3">
                                {session.formation.modules.map((module, index) => (
                                  <div key={module.id || index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Module : {module.titre || 'Titre non disponible'}
                                      </h4>
                                    </div>
                                    <Module module={module} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {hasAteliers && (
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2 text-purple-700">
                                <Settings className="h-5 w-5" />
                                Ateliers ({session.formation.ateliers.length})
                              </h3>
                              <div className="grid gap-3">
                                {session.formation.ateliers.map((atelier, index) => (
                                  <div key={atelier.id || index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-200">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        Atelier : {atelier.type || 'Type non disponible'}
                                      </h4>
                                    </div>
                                    <Atelier atelier={atelier} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {!hasModules && !hasAteliers && (
                            <div className="text-center py-12">
                              <div className="text-gray-400 mb-3">
                                <BookOpen className="h-12 w-12 mx-auto" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun contenu disponible</h3>
                              <p className="text-gray-500">
                                Aucun module ou atelier n'est encore disponible pour cette formation
                              </p>
                            </div>
                          )}
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Séances
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Séances - {session?.formation?.intitule}
                        </DialogTitle>
                        <DialogDescription>
                          Planning détaillé de vos séances de formation avec modules et ateliers
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[500px] w-full rounded-md">
                        {/* MODIFICATION PRINCIPALE : Passer le mapping des contenus au composant Seances */}
                        <Seances 
                          id={session.id} 
                          contentMapping={contentMapping}
                        />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Début:</span>
                    <span className="font-medium">{formatDate(session?.date_debut)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Fin:</span>
                    <span className="font-medium">{formatDate(session?.date_fin)}</span>
                  </div>
                </div>
                
                {session?.formation?.objectifs && (
                  <div className="mt-4">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-600 text-sm font-medium">Objectifs:</span>
                        <p className="text-sm mt-1 text-gray-700">
                          {session.formation.objectifs}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-gray-50">
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Durée: <span className="font-medium">{session?.formation?.duree || 0}h</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {hasModules && (
                      <span className="text-sm text-blue-600 font-medium">
                        {session.formation.modules.length} module{session.formation.modules.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {hasAteliers && (
                      <span className="text-sm text-purple-600 font-medium">
                        {session.formation.ateliers.length} atelier{session.formation.ateliers.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}