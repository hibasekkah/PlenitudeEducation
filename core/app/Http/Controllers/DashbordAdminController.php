<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use App\Models\Entreprise;
use App\Models\Formation;
use App\Models\Module;
use App\Models\SessionFormationEntreprise;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashbordAdminController extends Controller
{
    public function getStatistics(){

        $totalEntreprises = Entreprise::count();
        $totalParticipants = User::where('role','participant')->count();
        $totalFormateurs = User::where('role','formateur')->count();
        $totalModules = Module::count();
        $totalAteliers = Atelier::count();
        $totalFormations = Formation::count();

        $inscriptionsParMois = User::where('role', 'participant')
            ->select(
                DB::raw('COUNT(id) as count'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->where('created_at', '>', Carbon::now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        $participantsParFormation = Formation::query()
            ->select('formations.intitule', DB::raw('COUNT(DISTINCT session_users.user_id) as total_participants'))
            ->leftjoin('session_formation_entreprises', 'formations.id', '=', 'session_formation_entreprises.formation_id')
            ->leftjoin('session_users', 'session_formation_entreprises.id', '=', 'session_users.session_id')
            ->groupBy('formations.id', 'formations.intitule')
            ->orderBy('total_participants', 'desc')
            ->limit(5)
            ->get();

        $entreprisesParFormation = Formation::query()
            ->select('formations.intitule', DB::raw('COUNT(DISTINCT session_formation_entreprises.entreprise_id) as total_entreprises'))
            ->leftjoin('session_formation_entreprises', 'formations.id', '=', 'session_formation_entreprises.formation_id')
            ->leftjoin('entreprises', 'session_formation_entreprises.entreprise_id', '=', 'entreprises.id')
            ->groupBy('formations.id', 'formations.intitule')
            ->orderBy('total_entreprises', 'desc')
            ->limit(5)
            ->get();

        $formationsPopulaires = SessionFormationEntreprise::with('formation')
            ->select('formation_id', DB::raw('COUNT(id) as session_count'))
            ->groupBy('formation_id')
            ->orderBy('session_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'nom' => $item->formation->intitule,
                    'nombre_sessions' => $item->session_count,
                ];
            });

        $sessions = SessionFormationEntreprise::query();
        $sessionsAVenir = (clone $sessions)->where('etat', 'active')->count();
        $sessionsTerminees = (clone $sessions)->where('etat', 'termine')->count();
        $sessionsAnnulees = (clone $sessions)->where('etat', 'annuler')->count();
        



        $chiffre = SessionFormationEntreprise::select(
                'formation_id',
                DB::raw('COUNT(session_formation_entreprises.id) * formations.cout as Cout')
            )
            ->join('formations', 'formations.id', '=', 'session_formation_entreprises.formation_id')
            ->where('session_formation_entreprises.etat', 'active')
            ->groupBy('formation_id', 'formations.cout')
            ->with('formation')
            ->get()
            ->map(function ($item) {
                return [
                    'nom' => $item->formation->intitule,
                    'chiffres' => $item->Cout,
                ];
            });

        $chiffreTotale = $chiffre->sum('chiffres');
        
        return response()->json([
            'kpis' => [
                'total_clients' => $totalEntreprises,
                'total_participants' => $totalParticipants,
                'total_formateurs' => $totalFormateurs,
                'totalModules' => $totalModules,
                'totalAteliers' => $totalAteliers,
                'totalFormations' => $totalFormations,
                'sessionsAVenir' => $sessionsAVenir,
                'sessionsTerminees' => $sessionsTerminees,
                'sessionsAnnulees' => $sessionsAnnulees,
                'chiffreTotale' => $chiffreTotale
                
            ],
            'charts' => [
                'inscriptions_par_mois' => $inscriptionsParMois,
                'participantsParFormation' => $participantsParFormation,
                'entreprisesParFormation' => $entreprisesParFormation,
                'formationsPopulaires' => $formationsPopulaires,
                'chiffre' => $chiffre,
            ]
        ]);
    }

    public function getEStatistics(Entreprise $entreprise){

        $entreprise->loadCount([
            'employees as total_participants',
            'sessions', 
            'sessions as sessions_a_venir_count' => fn($q) => $q->where('etat', 'active'),
            'sessions as sessions_terminees_count' => fn($q) => $q->where('etat', 'termine'),
            'sessions as formations_uniques_suivies' => function ($query) {
                $query->select(DB::raw('count(distinct formation_id)'));
            }
        ]);

        return response()->json([
            'kpis' => [
                'total_participants' => $entreprise->total_participants,
                'total_sessions' => $entreprise->sessions_count,
                'sessions_a_venir' => $entreprise->sessions_a_venir_count,
                'sessions_terminees' => $entreprise->sessions_terminees_count,
                'formations_uniques_suivies' => $entreprise->formations_uniques_suivies,
            ],
            'charts' => [
                
            ]
        ]);
    }

    public function getFStatistics(Formation $formation){

        $formationWithStats = $formation->loadCount([
        'modules', 
        'ateliers', 
        'sessions', 
        
        'sessions as sessions_a_venir_count' => function ($query) {
            $query->where('etat', 'active');
        },
        'sessions as sessions_terminees_count' => function ($query) {
            $query->where('etat', 'termine');
        },
        'sessions as sessions_suspendues_count' => function ($query) {
            $query->where('etat', 'suspendue');
        },
        'sessions as sessions_annulees_count' => function ($query) {
            $query->where('etat', 'annuler');
        },
    ]);
        
        
        return response()->json([
            'kpis' => [
                'totalModules' => $formationWithStats->modules_count,
                'totalAteliers' => $formationWithStats->ateliers_count,
                'sessionsAVenir' => $formationWithStats->sessions_a_venir_count,
                'sessions' => $formationWithStats->sessions_count,
                'sessionsTerminees' => $formationWithStats->sessions_terminees_count,
                'sessionsAnnulees' => $formationWithStats->sessions_annulees_count,
                'sessionsSus' => $formationWithStats->sessions_suspendues_count,
            ],
            'charts' => [
                
            ]
        ]);
    }
}
