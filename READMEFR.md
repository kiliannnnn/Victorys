# 🇫🇷 **IMIN - Plateforme de Matchmaking et Tournois de Jeux Vidéo**  

IMIN est une plateforme permettant aux joueurs de participer à des **duels** et **tournois** dans divers jeux vidéo. Elle facilite la mise en relation, le chat en temps réel et la gestion automatisée des matchs pour une expérience fluide et compétitive.  

---

## 📋 **Fonctionnalités Principales**

1. **Gestion des utilisateurs**  
   - Authentification (connexion, inscription, déconnexion)  
   - Gestion du profil  

2. **Duels**  
   - File d'attente pour des matchs en temps réel  
   - Chat en temps réel pour organiser les étapes des duels  

3. **Tournois**  
   - Participation aux tournois programmés avec heure de début définie  
   - Progression automatique des matchs  
   - Récompenses selon les performances des joueurs  

4. **Système de monnaie**  
   - **Tickets d'or** (achetables via la plateforme)  
   - **Tickets d'argent** (distribués régulièrement aux joueurs)  

5. **Chat en temps réel**  
   - Messages privés instantanés entre joueurs  
   - Messages serveurs pour gérer la progression des duels  

6. **Gestion automatisée des matchs**  
   - Validation étape par étape des duels  
   - Gestion des litiges en cas de désaccord  

7. **Résultats et Classements**  
   - Affichage dynamique des résultats de matchs et classements des tournois  

---

## ⚙️ **Technologies utilisés**

- **Frontend**
  - React et Vite
  - TailwindCSS pour le style
  - React Query pour la récupération des données et le cache

- **Backend**
  - Supabase pour la base de données, l'authentification, et les fonctionnalités en temps réel

- **Testing**
  - Vitest pour les tests unitaires et d'intégrations

---

## 📂 **Project Structure**

```plaintext
📁 root
├── 📄 package.json              # Dépendances et scripts
├── 📄 vite.config.js            # Configuration de Vite
├── 📁 public                    # Fichiers statiques
│   └── 📄 index.html
├── 📁 src                       # Répertoire principal
│   ├── 📁 assets                # Images, styles globaux, etc.
│   │   ├── 📁 images
│   │   ├── 📁 styles
│   │   └── 📄 global.css        # Styles globaux
│   │
│   ├── 📁 components            # Composants réutilisables
│   │   ├── 📁 auth              # Composants liés à l'authentification
│   │   ├── 📁 tournaments       # Composants pour les tournois
│   │   ├── 📁 matchmaking       # File d'attente et matchmaking
│   │   ├── 📁 chat              # Chat en temps réel
│   │   └── 📄 Header.jsx        # Barre de navigation principale
│   │
│   ├── 📁 features              # Logique par fonctionnalité
│   │   ├── 📁 auth
│   │   ├── 📁 tournaments
│   │   ├── 📁 matchmaking
│   │   └── 📁 chat
│   │
│   ├── 📁 pages                 # Pages principales
│   │   ├── 📄 Home.jsx          # Accueil
│   │   ├── 📄 Login.jsx         # Connexion
│   │   ├── 📄 Register.jsx      # Inscription
│   │   ├── 📄 Profile.jsx       # Profil utilisateur
│   │   ├── 📄 Tournament.jsx    # Détails d'un tournoi
│   │   ├── 📄 Matchmaking.jsx   # Page de matchmaking
│   │   └── 📄 Chat.jsx          # Chat général
│   │
│   ├── 📁 routes                # Configuration des routes
│   │   └── 📄 AppRouter.jsx
│   │
│   ├── 📁 services              # Connexion avec Supabase
│   │   ├── 📄 supabaseClient.js # Initialisation du client Supabase
│   │   ├── 📄 auth.js           # Authentification API
│   │   ├── 📄 tournaments.js    # API des tournois
│   │   ├── 📄 matchmaking.js    # Matchmaking API
│   │   └── 📄 chat.js           # Chat API
│   │
│   ├── 📁 hooks                 # Hooks personnalisés
│   │   └── 📄 useAuthRedirect.js
│   │
│   ├── 📁 utils                 # Fonctions utilitaires
│   │   ├── 📄 helpers.js
│   │   └── 📄 constants.js
│   │
│   ├── 📁 tests                 # Tests unitaires
│   │   ├── 📁 components
│   │   └── 📄 setupTests.js
│   │
│   └── 📄 main.jsx              # Point d'entrée de l'application
└── 📄 README.md                 # Documentation du projet
```

---

## 🚀 **Installation et Configuration**

### Prérequis  
- Node.js et npm installés sur votre machine  

### Étapes  

1. **Cloner le projet**
   ```cli
   git clone https://github.com/username/IMIN.git  
   cd IMIN
   ```  

2. **Installer les dépendances**
   ```cli
   npm install
   ```  

3. **Configurer Supabase**  
   - Créez un projet Supabase sur Supabase  
   - Ajoutez vos informations dans un fichier `.env`:  
     VITE_SUPABASE_URL=your_supabase_url  
     VITE_SUPABASE_ANON_KEY=your_anon_key  

4. **Installer TailwindCSS**
   ```cli
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   - Mettez à jour la configuration de TailwindCSS dans `tailwind.config.js` pour inclure les chemins du contenu  

5. **Lancer le serveur de développement**
   ```cli
   npm run dev
   ```

---

## ✅ **Tests**

Lancer les tests unitaires et d'intégration avec Vitest:  

```cli
npm run test  
```
---

## 🚧 **Améliorations Futures**

- Intégration des API des jeux vidéo pour automatiser la validation des matchs  
- Fonctionnalités de chat avancées avec notifications et groupes  
- Passerelle de paiement sécurisée pour les Tickets d'or  
- Statistiques détaillées des joueurs et classements  

---

## 📄 **Licence**

Ce projet est sous licence **MIT**.  

---

## 🎯 **Contributeurs**

- **[kiliannnnn]** - Chef de Projet & Développeur Web Sénior  
