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

     public function getFStatistics(Formation $formation){

        // $totalEntreprises = Entreprise::count();
        // $totalParticipants = User::where('role','participant')->count();
        // $totalFormateurs = User::where('role','formateur')->count();
        $totalModules = $formation->modules->count();
        $totalAteliers = $formation->ateliers->count();
        // $totalFormations = Formation::count();

        // $inscriptionsParMois = User::where('role', 'participant')
        //     ->select(
        //         DB::raw('COUNT(id) as count'),
        //         DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
        //     )
        //     ->where('created_at', '>', Carbon::now()->subMonths(6))
        //     ->groupBy('month')
        //     ->orderBy('month', 'asc')
        //     ->get();

        // $participantsParFormation = Formation::query()
        //     ->select('formations.intitule', DB::raw('COUNT(DISTINCT session_users.user_id) as total_participants'))
        //     ->leftjoin('session_formation_entreprises', 'formations.id', '=', 'session_formation_entreprises.formation_id')
        //     ->leftjoin('session_users', 'session_formation_entreprises.id', '=', 'session_users.session_id')
        //     ->groupBy('formations.id', 'formations.intitule')
        //     ->orderBy('total_participants', 'desc')
        //     ->limit(5)
        //     ->get();

        // $entreprisesParFormation = Formation::query()
        //     ->select('formations.intitule', DB::raw('COUNT(DISTINCT session_formation_entreprises.entreprise_id) as total_entreprises'))
        //     ->leftjoin('session_formation_entreprises', 'formations.id', '=', 'session_formation_entreprises.formation_id')
        //     ->leftjoin('entreprises', 'session_formation_entreprises.entreprise_id', '=', 'entreprises.id')
        //     ->groupBy('formations.id', 'formations.intitule')
        //     ->orderBy('total_entreprises', 'desc')
        //     ->limit(5)
        //     ->get();

        // $formationsPopulaires = SessionFormationEntreprise::with('formation')
        //     ->select('formation_id', DB::raw('COUNT(id) as session_count'))
        //     ->groupBy('formation_id')
        //     ->orderBy('session_count', 'desc')
        //     ->limit(5)
        //     ->get()
        //     ->map(function ($item) {
        //         return [
        //             'nom' => $item->formation->intitule,
        //             'nombre_sessions' => $item->session_count,
        //         ];
        //     });

        $sessions = $formation->sessions->count();
        $sessionsAVenir = $formation->sessions->where('etat', 'active')->count();
        $sessionsTerminees = $formation->sessions->where('etat', 'termine')->count();
        $sessionsSus = $formation->sessions->where('etat', 'suspendre')->count();
        $sessionsAnnulees = $formation->sessions->where('etat', 'annuler')->count();
        



        // $chiffre = SessionFormationEntreprise::select(
        //         'formation_id',
        //         DB::raw('COUNT(session_formation_entreprises.id) * formations.cout as Cout')
        //     )
        //     ->join('formations', 'formations.id', '=', 'session_formation_entreprises.formation_id')
        //     ->where('session_formation_entreprises.etat', 'active')
        //     ->groupBy('formation_id', 'formations.cout')
        //     ->with('formation')
        //     ->get()
        //     ->map(function ($item) {
        //         return [
        //             'nom' => $item->formation->intitule,
        //             'chiffres' => $item->Cout,
        //         ];
        //     });

        // $chiffreTotale = $chiffre->sum('chiffres');
        
        return response()->json([
            'kpis' => [
                'totalModules' => $totalModules,
                'totalAteliers' => $totalAteliers,
                'sessionsAVenir' => $sessionsAVenir,
                'sessions' => $sessions,
                'sessionsTerminees' => $sessionsTerminees,
                'sessionsAnnulees' => $sessionsAnnulees,
                'sessionsSus' => $sessionsSus,
            ],
            'charts' => [
                
            ]
        ]);
    }
}
