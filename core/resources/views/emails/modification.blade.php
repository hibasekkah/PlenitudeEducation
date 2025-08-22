<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modification de Séance</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 20px; }
        .details { background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;}
        .details strong { display: inline-block; width: 120px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; }
        .footer { margin-top: 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Notification de Modification de Séance</div>
        
        <p>Bonjour {{ $participant->prenom }},</p>
        
        <p>
            Nous vous informons qu'une modification a été apportée à l'une de vos séances de formation pour la session
            <strong>"{{ $session->formation->intitule }}"</strong>.
        </p>

        <div class="details">
            <p><strong>Module :</strong> {{ $seance->module->titre ?? 'N/A' }}</p>
            <p><strong>Date :</strong> {{ \Carbon\Carbon::parse($seance->date)->format('d/m/Y') }}</p>
            <p><strong>Heure début :</strong> {{ \Carbon\Carbon::parse($seance->heure_debut)->format('H:i') }}</p>
            <p><strong>Heure fin :</strong> {{ \Carbon\Carbon::parse($seance->heure_fin)->format('H:i') }}</p>
            <p><strong>Formateur :</strong> {{ $seance->formateur->nom ?? 'N/A' }} {{ $seance->formateur->prenom ?? '' }}</p>
        </div>

        <p>
            Nous vous invitons à consulter votre planning pour voir les détails mis à jour.
        </p>

        <p>
            <a href="{{ $planningUrl }}" class="button">Consulter mon Planning</a>
        </p>

        <div class="footer">
            <p>Cordialement,<br>L'équipe de Formation</p>
        </div>
    </div>
</body>
</html>