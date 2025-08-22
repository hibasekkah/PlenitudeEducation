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
import { toast } from 'sonner';
import { 
  Download, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Settings, 
  Package,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
  Eye,
  UserCheck
} from "lucide-react";

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

function getFileSize(bytes) {
  if (!bytes) return '';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export function Seance({ id, contentMapping }) {
  const { user } = useAuth();
  const [seances, setSeanceData] = useState([]);
  const [seancesa, setSeanceDataa] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    const fetchSeances = async () => {
      if (!user?.id) {
        setError("Utilisateur non identifié");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await ParticipantApi.seance(user.id);
        
        setSeanceData(response.data.seances_du_jour || []);
        setSeanceDataa(response.data.seances_avenir || []);
        
        console.log(response.data);
      } catch (error) {
        console.error("Impossible de récupérer les Séances :", error);
        setError("Erreur lors du chargement des séances");
        toast.error("Impossible de charger vos séances");
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, [user?.id, id]);

  const onSubmit = async (seance) => {
    if (!seance?.id) {
      toast.error("Erreur: Séance invalide");
      return;
    }

    const now = new Date();
    const seanceDate = new Date(seance.date);
    
    if (now.toDateString() !== seanceDate.toDateString()) {
      toast.error("Le pointage n'est possible que le jour de la séance");
      return;
    }

    // Vérifier les horaires
    const [debutHours, debutMinutes] = seance.heure_debut.split(':').map(Number);
    const [finHours, finMinutes] = seance.heure_fin.split(':').map(Number);
    
    const debut = new Date(seanceDate);
    debut.setHours(debutHours, debutMinutes, 0, 0);
    
    const fin = new Date(seanceDate);
    fin.setHours(finHours, finMinutes, 0, 0);
    
    if (now < debut) {
      toast.error(`Le pointage sera possible à partir de ${formatTime(seance.heure_debut)}`);
      return;
    }
    
    if (now > fin) {
      toast.error(`Le pointage n'est plus possible après ${formatTime(seance.heure_fin)}`);
      return;
    }

    setSubmittingId(seance.id);
    const loadingToast = toast.loading('Enregistrement de la présence...');
    
    try {
      const payload = {
        date: new Date().toISOString().split('T')[0],
        arriver: new Date().toLocaleTimeString('fr-FR', { hour12: false }),
        seance_id: seance.id,
        user_id: user.id,
      };
      
      const response = await ParticipantApi.pointe(payload);
      console.log("Présence enregistrée :", response.data);
      toast.success('Présence enregistrée avec succès');
      setClickedButtons((prev) => [...prev, seance.id]);
      
      // Mettre à jour la présence dans la séance locale
      setSeanceData(prevSeances => 
        prevSeances.map(s => 
          s.id === seance.id 
            ? { ...s, presence_participant: true }
            : s
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la présence :", error);
      
      // Gestion des erreurs spécifiques
      if (error.response?.status === 422) {
        const errorMessage = error.response.data.error || "Erreur de validation";
        toast.error(errorMessage);
      } else {
        toast.error("Erreur lors de l'enregistrement de la présence");
      }
    } finally {
      toast.dismiss(loadingToast);
      setSubmittingId(null);
    }
  };

  const renderPresenceStatus = (seance, showPresenceButton = false) => {
    const isClicked = clickedButtons.includes(seance.id);
    const isSubmitting = submittingId === seance.id;
    const isPresent = seance.presence_participant === true || isClicked;

    if (!showPresenceButton) {
      // Pour les séances passées ou futures, afficher seulement le statut
      if (seance.presence_participant === true) {
        return (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Présent(e)</span>
          </div>
        );
      } else if (seance.presence_participant === false) {
        return (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Absent(e)</span>
          </div>
        );
      }
      return null;
    }

    // Pour les séances d'aujourd'hui
    if (isPresent) {
      return (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Présence confirmée</span>
        </div>
      );
    }

    // Vérifier si nous sommes dans les horaires autorisés
    const now = new Date();
    const seanceDate = new Date(seance.date);
    const [debutHours, debutMinutes] = seance.heure_debut.split(':').map(Number);
    const [finHours, finMinutes] = seance.heure_fin.split(':').map(Number);
    
    const debut = new Date(seanceDate);
    debut.setHours(debutHours, debutMinutes, 0, 0);
    
    const fin = new Date(seanceDate);
    fin.setHours(finHours, finMinutes, 0, 0);

    const isInTimeRange = now >= debut && now <= fin;
    const isSameDay = now.toDateString() === seanceDate.toDateString();

    if (!isSameDay) {
      return (
        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Pointage non disponible</span>
        </div>
      );
    }

    if (!isInTimeRange) {
      if (now < debut) {
        return (
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Disponible à {formatTime(seance.heure_debut)}</span>
          </div>
        );
      } else {
        return (
          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Pointage fermé</span>
          </div>
        );
      }
    }

    return (
      <Button 
        onClick={() => onSubmit(seance)} 
        disabled={isSubmitting || !isInTimeRange}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            En cours...
          </>
        ) : (
          <>
            <UserCheck className="h-4 w-4" />
            Marquer présent(e)
          </>
        )}
      </Button>
    );
  };

  const renderSeanceCard = (seance, showPresenceButton = false, section = '') => {
    if (!seance?.id) return null;

    const isModule = seance.module;
    const isAtelier = seance.atelier;

    return (
      <Card className="mt-3 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                {isModule ? (
                  <>
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Module : {seance.module?.titre || contentMapping?.modules?.[seance.module?.id]?.titre || 'Titre non disponible'}
                  </>
                ) : isAtelier ? (
                  <>
                    <Settings className="h-5 w-5 text-purple-600" />
                    Atelier : {seance.atelier?.type || contentMapping?.ateliers?.[seance.atelier?.id]?.type || 'Type non disponible'}
                  </>
                ) : (
                  <span>Séance</span>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                {seance.session_id?.formation?.intitule || 'Formation non disponible'}
              </CardDescription>
            </div>
            
            <CardAction>
              {renderPresenceStatus(seance, showPresenceButton)}
            </CardAction>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{formatDate(seance.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{formatTime(seance.heure_debut)} - {formatTime(seance.heure_fin)}</span>
            </div>
          </div>

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

          {/* Support de cours pour les modules */}
          {isModule && seance.module?.files && seance.module.files.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FileText className="h-4 w-4" />
                Support de cours ({seance.module.files.length} fichier{seance.module.files.length > 1 ? 's' : ''})
              </h3>
              <div className="space-y-2">
                {seance.module.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border transition-colors">
                    <div className="flex items-center space-x-3 flex-1">
                      <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.file_nom || 'Document sans nom'}
                        </p>
                        {file.size && (
                          <p className="text-xs text-gray-500">
                            {getFileSize(file.size)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="flex items-center gap-1"
                      >
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="h-4 w-4" />
                          Voir
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex items-center gap-1"
                      >
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                          download={file.file_nom || 'document'}
                        >
                          <Download className="h-4 w-4" />
                          Télécharger
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {seance.Observations && (
          <CardFooter className="bg-gray-50">
            <div className="flex items-start gap-2 w-full">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-gray-900">Observations :</span>
                <p className="text-sm text-gray-700 mt-1">{seance.Observations}</p>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    );
  };

  const renderEmptyState = (title, message) => (
    <Card className="mt-3">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
      </CardContent>
    </Card>
  );

  // État de chargement
  if (loading) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-blue-950 text-2xl font-medium mb-2">Mes Séances</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Chargement de vos séances...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-blue-950 text-2xl font-medium mb-2">Mes Séances</h1>
        </div>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 mx-auto text-red-500 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
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

  return (
    <div className="m-7">
      <div className="mb-6">
        <h1 className="text-blue-950 text-2xl font-medium mb-2">Mes Séances</h1>
        <p className="text-gray-600">Gérez votre présence et accédez aux supports de cours</p>
      </div>

      {/* Séances d'aujourd'hui */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-blue-950 text-xl font-medium mb-1 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Séances d'aujourd'hui
          </h2>
          <p className="text-sm text-gray-600">
            {seances.length} séance{seances.length > 1 ? 's' : ''} programmée{seances.length > 1 ? 's' : ''} aujourd'hui
          </p>
        </div>
        
        {seances.length > 0 ? (
          <div className="space-y-3">
            {seances.map((seance, index) => (
              <div key={`today-${seance.id}-${index}`}>
                {renderSeanceCard(seance, true, 'today')}
              </div>
            ))}
          </div>
        ) : (
          renderEmptyState(
            "Aucune séance aujourd'hui", 
            "Profitez de votre journée libre !"
          )
        )}
      </section>

      {/* Séances à venir */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-blue-950 text-xl font-medium mb-1 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Séances à venir
          </h2>
          <p className="text-sm text-gray-600">
            {seancesa.length} séance{seancesa.length > 1 ? 's' : ''} planifiée{seancesa.length > 1 ? 's' : ''}
          </p>
        </div>
        
        {seancesa.length > 0 ? (
          <div className="space-y-3">
            {seancesa.map((seance, index) => (
              <div key={`upcoming-${seance.id}-${index}`}>
                {renderSeanceCard(seance, false, 'upcoming')}
              </div>
            ))}
          </div>
        ) : (
          renderEmptyState(
            "Aucune séance à venir", 
            "Toutes vos séances sont terminées ou aucune n'est encore planifiée"
          )
        )}
      </section>

      {/* Résumé statistique */}
      {(seances.length > 0 || seancesa.length > 0) && (
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Résumé de vos séances</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-2xl text-blue-600">{seances.length}</div>
              <div className="text-gray-600">Aujourd'hui</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-purple-600">{seancesa.length}</div>
              <div className="text-gray-600">À venir</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}