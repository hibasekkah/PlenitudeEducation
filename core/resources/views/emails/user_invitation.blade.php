<x-mail::message>
# Bienvenue sur Plénitude Éducation !

Bonjour,

Vous avez été invité(e) à rejoindre notre plateforme.

Pour finaliser votre inscription et créer votre compte, veuillez cliquer sur le bouton ci-dessous. Ce lien est personnel et expirera dans 7 jours.

<x-mail::button :url="$link" color="success">
    Finaliser mon inscription
</x-mail::button>

Si vous n'êtes pas à l'origine de cette invitation, vous pouvez ignorer cet e-mail en toute sécurité.

Cordialement,<br>
L'équipe de {{ config('app.name') }}
</x-mail::message>