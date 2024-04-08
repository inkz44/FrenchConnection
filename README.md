# FrenchConnection API

## But du projet

Le but de l'API FrenchConnection est de permettre de récupérer des informations sur une plante en fonction de son nom de famille commun en utilisant l'API Trefle.

## Technologies utilisées

 - Node.js (v20.12.1)
 - node-fetch (^3.3.2)
 - Express.js (^4.19.2)

## Installation

 - Télécharger le projet en local.
 - "npm install" pour installer les dépendances nécessaires.
 - "npm start" pour démarrer le serveur Express.js sur le port 8000.

 ## Cas d'utilisation

 - http://localhost:8000/api/fr?family_common_name=<nom_de_la_famille>

 Remplacez `<nom_de_la_famille>` par le nom de la famille de plantes que vous souhaitez rechercher.

 


 ## Sortie de l'API

Lorsque vous interrogez l'API en utilisant l'URL spécifiée avec le paramètre `family_common_name`, vous recevrez une réponse au format JSON contenant des informations sur les plantes de la famille spécifiée. Voici un exemple de la structure JSON de la réponse :

```json
[
    {
        "scientific_name": "Nom scientifique de la plante",
        "year": "Année de découverte de la plante",
        "genus_family_common_name": "Nom commun de la famille du genre de la plante",
        "species_observation": "Observations sur l'espèce de la plante"
    }
]
