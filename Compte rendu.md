Partie 5.1 :

Pourquoi Home restait affiché après connexion ?
Home était présent dans les deux états de navigation donc React Navigation le conservait au lieu d'afficher Dashboard.

Pourquoi navigation.navigate("Dashboard") provoquait une erreur ?
Parce que Dashboard n'était pas encore disponible dans la navigation au moment de l'appel.

À quoi sert navigationKey ?
Cela permet de réinitialiser la navigation lorsque l'utilisateur se connecte ou se déconnecte.

Partie 5.2 :

Pourquoi FraisForm n'a plus besoin de distinguer ajout et modification ?
Il récupère simplement les données du formulaire et c'est l'écran parent qui décide s'il faut ajouter ou modifier un frais.

Que se passerait-il sans try/catch ?
L'application ne pourrait pas afficher correctement un message d'erreur à l'utilisateur en cas d'erreur de l'API.

Partie 5.3 :

Pourquoi android.package est indispensable ?
Car ça permet d'identifier l'application de manière unique sur Android.

Pourquoi utiliser distribution: "internal" et buildType: "apk" ?
Pour créer un fichier APK installable directement sur un téléphone.

Pourquoi le HTTPS est obligatoire sur Android 9+ ?
Pour sécuriser les échanges avec le serveur et éviter l'interception des mots de passe et des données personnelles.
