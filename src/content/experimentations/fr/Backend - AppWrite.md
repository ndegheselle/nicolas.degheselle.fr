---
title: "AppWrite"
group: "Backend web"
---

## Résumé

Serveur backend open-source qui fournit aux développeurs un ensemble d'APIs simples d'utilisation pour gérer l'authentification, les bases de données, le stockage et bien plus, permettant de développer rapidement des applications web et mobiles modernes.

## Retour d'expérience

- Les relations sont brouillonnes (impossible d'interroger / inclure / exclure facilement les enfants ou le parent)
    - La seule alternative est de gérer la relation soi-même
    - Impossible de faire des requêtes comme tous les utilisateurs sans post, ou similaires (tous les utilisateurs avec plus de 10 likes sur leurs posts)
- Le développement de fonctions est documenté, mais les cas spécifiques sont pénibles (envoyer un fichier en format binaire)
    - La configuration locale est un peu compliquée si l'on veut éviter de déployer à chaque test
- Impossible de réordonner les champs
- Aucun moyen simple d'ajouter des données à un utilisateur (pas de relation vers la table Auth, il faut créer sa propre table avec une fonction pour garantir la synchronisation à l'inscription)
