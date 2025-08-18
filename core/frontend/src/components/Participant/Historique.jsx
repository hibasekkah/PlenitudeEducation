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
import { useEffect, useState } from "react"
import ParticipantApi from "@/services/api/Participant"
import { useAuth } from "@/provider/authProvider"
import { handleAttestation } from "@/services/api/Attestation"
import { toast } from "sonner" 

export function Historique() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadingAttestationId, setDownloadingAttestationId] = useState(null)

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user?.id) return
      
      try {
        setLoading(true)
        setError(null)
        const response = await ParticipantApi.sessionT(user.id)
        setSessions(response.data?.data || [])
      } catch (error) {
        console.error("Impossible de récupérer les Sessions :", error)
        setError("Erreur lors du chargement des formations")
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [user?.id])

  const handleDownloadAttestation = async (sessionId) => {
    await handleAttestation(user.id, sessionId, setDownloadingAttestationId, toast)
  }

  if (loading) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Formations Terminées</h1>
        </div>
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="m-7">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Formations Terminées</h1>
        </div>
        <div className="flex justify-center items-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="m-7">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Formations Terminées</h1>
        {sessions.length > 0 && (
          <p className="text-gray-600 mt-2">
            {sessions.length} formation{sessions.length > 1 ? 's' : ''} terminée{sessions.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {session?.formation?.intitule || 'Formation sans titre'}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Niveau : {session?.formation?.niveau || 'Non spécifié'}
                    </CardDescription>
                  </div>
                  <CardAction>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadAttestation(session.id)}
                      disabled={downloadingAttestationId === session.id}
                      className="ml-4"
                    >
                      {downloadingAttestationId === session.id ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Téléchargement...</span>
                        </div>
                      ) : (
                        "Attestation"
                      )}
                    </Button>
                  </CardAction>
                </div>
              </CardHeader>
              
              {(session?.formation?.objectifs || session?.formation?.duree) && (
                <>
                  {session?.formation?.objectifs && (
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-2">Objectifs :</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {session.formation.objectifs}
                        </p>
                      </div>
                    </CardContent>
                  )}
                  
                  <CardFooter className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-2">
                        {session?.formation?.duree && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span><strong>Durée :</strong> {session.formation.duree} heures</span>
                          </div>
                        )}
                        
                        {session?.formation?.categorie && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span><strong>Catégorie :</strong> {session.formation.categorie}</span>
                          </div>
                        )}

                        {session?.entreprise?.nom && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span><strong>Entreprise :</strong> {session.entreprise.nom}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {session?.date_debut && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span><strong>Début :</strong> {new Date(session.date_debut).toLocaleDateString('fr-FR')}</span>
                          </div>
                        )}
                        
                        {session?.date_fin && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span><strong>Fin :</strong> {new Date(session.date_fin).toLocaleDateString('fr-FR')}</span>
                          </div>
                        )}

                        
                      </div>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune formation terminée
          </h3>
          <p className="text-gray-600">
            Vous n'avez pas encore terminé de formations.
          </p>
        </div>
      )}
    </div>
  )
}