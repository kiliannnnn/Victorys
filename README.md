# 🎮 IMIN - Video Game Matchmaking and Tournament Platform 🎮

IMIN is a platform that allows players to participate in **duels** and **tournaments** across various video games. It facilitates matchmaking, real-time chat, and automated match management to ensure smooth player interaction and competitive gameplay.

---

## 📋 **Core Features**

1. **User Management**
   - Authentication (login, registration, logout)
   - Profile management

2. **Duels**
   - Queue system for real-time 1v1 matches
   - Dedicated real-time chat for organizing duels and verifying steps

3. **Tournaments**
   - Join scheduled tournaments with defined start times
   - Automated matchmaking for tournament progression
   - Rewards distributed based on player performance

4. **Currency System**
   - **Gold Tickets** (purchasable on the platform)
   - **Silver Tickets** (periodically awarded for free to active players)

5. **Real-Time Chat**
   - Instant private messaging between players
   - Server-side messages to manage duel progression and results

6. **Automated Match Management**
   - Step-by-step validation of duels (matchmaking → agreement → completion → validation)
   - Handling disputes if players disagree on match results

7. **Results and Rankings**
   - Display tournament rankings and match results dynamically

---

## ⚙️ **Technologies Used**

- **Frontend**
  - React with Vite
  - TailwindCSS for styling
  - React Query for data fetching and caching

- **Backend**
  - Supabase for database, authentication, and real-time features

- **Testing**
  - Vitest for unit and integration testing

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

## 🚀 **Installation and Configuration**

### Prerequisites  
- Node.js and npm installed on your machine  

### Steps  

1. **Clone the repository**
   ```cli
   git clone https://github.com/kiliannnnn/IMIN.git  
   cd IMIN  
   ```
   
2. **Install dependencies**
   ```cli
   npm install  
   ```

3. **Configure Supabase**  
   - Create a Supabase project on Supabase  
   - Add your credentials to a `.env` file:  
     VITE_SUPABASE_URL=your_supabase_url  
     VITE_SUPABASE_ANON_KEY=your_anon_key  

4. **Install TailwindCSS**
   ```cli
   npm install -D tailwindcss postcss autoprefixer  
   npx tailwindcss init -p  
   ```

   - Update the TailwindCSS configuration in `tailwind.config.js` to include content paths  

5. **Run the development server**
   ```cli
   npm run dev  
   ```

---

## ✅ **Testing**

Run unit and integration tests using Vitest:
```cli
npm run test  
```
---

## 🚧 **Future Improvements**

- Integration of game APIs for automated match validation  
- Enhanced chat features with notifications and group chats  
- Secure payment gateway for purchasing Gold Tickets  
- Detailed player stats and leaderboards  

---

## 📄 **License**

This project is licensed under the **MIT License**.  

---

## 🎯 **Contributors**

- **[kiliannnnn]** - Project Manager & Web Developer  

---

