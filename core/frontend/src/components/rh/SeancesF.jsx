import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/provider/authProvider";
import { Button } from "../ui/button"
import SessionApi from "../../services/api/Session";
import { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Settings, 
  Package,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileDown
} from "lucide-react";
import { toast } from 'sonner';

function formatDate(rawDate) {
  if (!rawDate) return "Date non disponible";
  try {
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "Date invalide";
    
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return "Date invalide";
  }
}

function formatTime(time) {
  if (!time) return "N/A";
  try {
    return time.substring(0, 5);
  } catch (error) {
    return time;
  }
}

function getSeanceStatus(date, heureDebut, heureFin) {
  if (!date || !heureDebut || !heureFin) return 'unknown';
  
  try {
    const now = new Date();
    const seanceDate = new Date(date);
    
    // Créer des objets Date avec l'heure
    const [debutHours, debutMinutes] = heureDebut.split(':').map(Number);
    const [finHours, finMinutes] = heureFin.split(':').map(Number);
    
    const debut = new Date(seanceDate);
    debut.setHours(debutHours, debutMinutes, 0, 0);
    
    const fin = new Date(seanceDate);
    fin.setHours(finHours, finMinutes, 0, 0);
    
    if (now < debut) return 'upcoming';
    if (now > fin) return 'completed';
    return 'ongoing';
  } catch (error) {
    return 'unknown';
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'upcoming':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          <Clock className="h-3 w-3" />
          À venir
        </span>
      );
    case 'ongoing':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          <CheckCircle2 className="h-3 w-3" />
          En cours
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
          <CheckCircle2 className="h-3 w-3" />
          Terminée
        </span>
      );
    default:
      return null;
  }
}

export function SeancesF({ id }) {
  const [seances, setSeanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [downloadingListeId, setDownloadingListeId] = useState(null);


  const handlePresence = async (id) => {
    try {
      setDownloadingListeId(id);
      await new Promise(resolve => setTimeout(resolve, 500));
      window.open(`http://localhost:8000/api/presence/${id}`, "_blank");
      toast.success("La liste de présence téléchargé avec succès");
    } catch (error) {
      toast.error("Erreur lors du téléchargement de la liste de présence");
      console.error("Erreur téléchargement de la liste de présence:", error);
    } finally {
      setDownloadingListeId(null);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("ID de session requis");
      setLoading(false);
      return;
    }

    const fetchSeances = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await SessionApi.seances(id, { user_id: user.id });
        
        if (response.data && response.data.data) {
          const sortedSeances = response.data.data.sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.heure_debut);
            const dateB = new Date(b.date + ' ' + b.heure_debut);
            return dateA - dateB;
          });
          setSeanceData(sortedSeances);
        } else {
          setSeanceData([]);
        }
      } catch (error) {
        console.error("Impossible de récupérer les Séances :", error);
        setError("Erreur lors du chargement des séances");
        toast.error("Impossible de charger les séances");
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, [id, user.id]); 

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-blue-950 text-xl font-medium mb-3">Séances</h1>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Chargement des séances...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-blue-950 text-xl font-medium mb-3">Séances</h1>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center text-red-600 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              Erreur
            </div>
            <p className="text-center text-gray-600 mb-4">{error}</p>
            <div className="text-center">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                size="sm"
              >
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!seances || seances.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-blue-950 text-xl font-medium mb-3">Séances</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune séance programmée</h3>
              <p className="text-gray-600">Il n'y a pas encore de séances planifiées pour cette formation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-blue-950 text-xl font-medium mb-1">Séances</h1>
        <p className="text-gray-600 text-sm">
          {seances.length} séance{seances.length > 1 ? 's' : ''} programmée{seances.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3">
        {seances.map((seance, index) => {
          if (!seance || !seance.id) return null;

          const status = getSeanceStatus(seance.date, seance.heure_debut, seance.heure_fin);
          const isModule = seance.module;
          const isAtelier = seance.atelier;

          return (
            <Card 
              key={seance.id} 
              className={`transition-all duration-200 hover:shadow-md ${
                status === 'ongoing' ? 'ring-2 ring-green-200 bg-green-50/50' : 
                status === 'completed' ? 'opacity-75' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 flex-row">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {isModule ? (
                        <>
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <span>Module : {seance.module?.titre || 'Titre non disponible'}</span>
                        </>
                      ) : isAtelier ? (
                        <>
                          <Settings className="h-5 w-5 text-purple-600" />
                          <span>Atelier : {seance.atelier?.type || 'Type non disponible'}</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <span>Séance #{index + 1}</span>
                        </>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{seance.session_id?.formation?.intitule || 'Formation non disponible'}</span>
                    </CardDescription>
                    <Button 
                    onClick={() => handlePresence(seance.id)} 
                    variant="outline"
                    size="sm"
                    disabled={downloadingListeId === seance.id}
                    className="flex items-center gap-2 mt-2"
                  >
                    {downloadingListeId === seance.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4" />
                    )}
                    Liste de présence
                  </Button>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(status)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Informations de timing */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{formatDate(seance.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {formatTime(seance.heure_debut)} - {formatTime(seance.heure_fin)}
                    </span>
                  </div>
                </div>

                {/* Informations spécifiques aux ateliers */}
                {isAtelier && (
                  <div className="space-y-2">
                    {seance.atelier?.lieu && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Lieu : <strong>{seance.atelier.lieu}</strong></span>
                      </div>
                    )}
                    {seance.materiels && (
                      <div className="flex items-start gap-2 text-sm">
                        <Package className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Matériels requis :</span>
                          <p className="text-gray-700 mt-1">{seance.materiels}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description du module si disponible */}
                {isModule && seance.module?.description && (
                  <div className="text-sm">
                    <p className="text-gray-700">{seance.module.description}</p>
                  </div>
                )}

                {/* Informations sur la durée */}
                {seance.heure_debut && seance.heure_fin && (
                  <div className="text-xs text-gray-500 mt-2">
                    Durée estimée : {(() => {
                      try {
                        const [debutH, debutM] = seance.heure_debut.split(':').map(Number);
                        const [finH, finM] = seance.heure_fin.split(':').map(Number);
                        const dureeMinutes = (finH * 60 + finM) - (debutH * 60 + debutM);
                        const heures = Math.floor(dureeMinutes / 60);
                        const minutes = dureeMinutes % 60;
                        return heures > 0 ? `${heures}h${minutes > 0 ? ` ${minutes}min` : ''}` : `${minutes}min`;
                      } catch {
                        return 'Non calculable';
                      }
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Résumé des séances</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600 text-lg">
              {seances.filter(s => getSeanceStatus(s.date, s.heure_debut, s.heure_fin) === 'upcoming').length}
            </div>
            <div className="text-gray-600">À venir</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600 text-lg">
              {seances.filter(s => getSeanceStatus(s.date, s.heure_debut, s.heure_fin) === 'ongoing').length}
            </div>
            <div className="text-gray-600">En cours</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-600 text-lg">
              {seances.filter(s => getSeanceStatus(s.date, s.heure_debut, s.heure_fin) === 'completed').length}
            </div>
            <div className="text-gray-600">Terminées</div>
          </div>
        </div>
      </div>
    </div>
  );
}