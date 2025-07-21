<x-mail::message>
# Convocation à votre session de formation

Bonjour {{ $participant->nom }},

Votre inscription à la session de formation **"{{ $session->formation->intitule }}"** est confirmée.

Vous trouverez ci-dessous un résumé des informations essentielles.

---

### Détails de la Formation

**Intitulé :** {{ $session->formation->intitule }}

**Dates :** Du {{ $session->date_debut }} au {{ $session->date_fin}}

**Lieu :** {{ $session->formation->lieu }}

---

### Accédez à votre Espace Personnel

Tous les détails concernant votre formation, y compris le **planning détaillé**, les **supports de cours** à télécharger et les informations pratiques, sont disponibles sur votre espace personnel.


<x-mail::button :url="$link" color="primary">
    Consulter mon planning et mes documents
</x-mail::button>

Cordialement,<br>
L'équipe de {{ config('app.name') }}
</x-mail::message>