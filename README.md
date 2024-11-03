# Description

Cette application permet aux utilisateurs de voter pour différents chats. Elle utilise **Node.js**, **Express**, **TypeORM** pour gérer la base de données **PostgreSQL**, et **Next.js** pour le frontend. Elle comprend des fonctionnalités comme l’importation automatique de données, la documentation avec Swagger, et la sécurisation avec Helmet et compression. 
Le frontend de l'application est accessible à l'adresse suivante :

```
http://54.91.105.247
```
## Table des Matières

- [Configuration](#configuration)
- [Installation](#installation)
- [Lancement de l'Application](#lancement-de-lapplication)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [Swagger Documentation](#swagger-documentation)
- [Dépendances Principales](#dépendances-principales)
- [Pratiques de Sécurité et de Performances](#pratiques-de-sécurité-et-de-performances)

---

## Configuration

### Variables d'Environnement

Avant de lancer le projet, configurez les variables d'environnement dans un fichier `.env` (localisé dans le dossier `back/` pour le backend). Voici les variables nécessaires :

```dotenv
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=cats
DB_PORT=5432
PORT=3000
```

### Configuration CORS

L’application accepte les requêtes provenant de :

- `http://localhost:4000` pour le frontend en développement local

## Installation

Assurez-vous d'avoir **Docker** et **pnpm** installés. Clonez le projet puis exécutez :

```bash
pnpm install
```

### Installation des Dépendances

Installez les dépendances pour le backend et le frontend avec :

```bash
pnpm install
```

## Lancement de l'Application

### Lancement avec Docker

Construisez et lancez les services Docker :

```bash
sudo docker compose --env-file ./back/.env up --build
```

### Lancement en Développement

Pour lancer uniquement le backend en mode développement :

```bash
cd back
pnpm run dev
```

Pour lancer uniquement le frontend :

```bash
cd front
pnpm run dev
```

## API Endpoints

L’API offre les routes suivantes :

### Chats (`/api/cats`)

- `GET /api/cats` : Récupère tous les chats avec leurs scores

### Votes (`/api/votes`)

- `POST /api/votes` : Envoie un vote pour un chat avec les paramètres suivants dans le corps de la requête :
    ```json
    {
      "catId": "ID_du_chat",
      "voterId": "identifiant_unique_du_votant"
    }
    ```

## Tests

### Tests Unitaires et d'Intégration

Lancez tous les tests en exécutant :

```bash
pnpm test
```

### Configuration de Test

Le fichier `setupTests.ts` initialise la base de données de test et insère des données pour les tests. Il utilise **Jest** comme framework de test.

## Swagger Documentation

La documentation Swagger est disponible à l'URL suivante une fois l'application lancée :

```
http://localhost:3000/api-docs
```

Swagger documente toutes les routes et les paramètres de l'API pour faciliter l'intégration.

## Dépendances Principales

- **Node.js / Express** : Backend de l'application
- **TypeORM** : ORM pour PostgreSQL
- **Next.js** : Framework pour le frontend
- **Helmet** : Protection des en-têtes HTTP
- **compression** : Compression des réponses HTTP
- **cors** : Configuration CORS
- **Swagger** : Documentation de l'API
- **pnpm** : Gestionnaire de packages pour une installation rapide

## Pratiques de Sécurité et de Performances

- **Helmet** : Sécurise les en-têtes HTTP pour protéger contre les attaques courantes
- **Compression** : Gzip pour optimiser les temps de chargement
- **Logging** : Winston pour un suivi détaillé des logs d'erreurs et d'événements

## Front

### URL de l'Application en Ligne

Le frontend de l'application est accessible à l'adresse suivante :

```
http://54.91.105.247
```

### Configuration de l'URL de l'API

L'URL de l'API backend que le frontend utilise est définie via la variable d'environnement `NEXT_PUBLIC_API_URL`. Cela permet de pointer le frontend vers l'URL correcte de l'API, que ce soit en local ou en production.

Pour modifier l'URL de l'API backend dans le frontend, ouvrez le fichier `.env.local` dans le répertoire `front/` et mettez à jour `NEXT_PUBLIC_API_URL` avec la nouvelle URL.

**Exemple :**

```dotenv
NEXT_PUBLIC_API_URL=http://3.90.222.223:3000
```