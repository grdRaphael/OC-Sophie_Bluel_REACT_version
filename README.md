# Sophie Bluel — Portfolio d'architecte d'intérieur (version React)

Site portfolio d'une architecte d'intérieur, avec un **mode édition** qui permet d'ajouter et de supprimer des projets via une API.

C'est une **réécriture en React + TypeScript** du projet 3 de la formation OpenClassrooms *Intégrateur web*, que j'avais d'abord réalisé en JavaScript (sans framework) :
👉 [Version JavaScript](https://github.com/grdRaphael/OC-Projet3-Portfolio-architecte-Sophie-Bluel)

J'ai fait cette version en plus du projet demandé, pour apprendre à construire une application React connectée à une API. Je l'ai ensuite améliorée pour qu'elle reprenne toutes les finitions de la version JS.

## Fonctionnalités

**Pour les visiteurs**
- Galerie des projets, chargée depuis l'API
- Filtres par catégorie
- Section contact

**Pour l'architecte (après connexion)**
- Connexion par e-mail / mot de passe (token JWT), avec messages d'erreur
- Bannière « Mode édition » et bouton « Modifier »
- Modale de gestion de la galerie :
  - **suppression** d'un projet avec un toast **« Annuler »** : la suppression ne devient définitive qu'après 5 secondes
  - **ajout** d'un projet (photo, titre, catégorie) avec aperçu de l'image et validation du formulaire (messages par champ, bouton actif seulement quand tout est rempli)
- Animations d'ouverture et de fermeture des modales, et glissement entre les deux modales sur mobile

**Responsive** : mise en page adaptée aux écrans de moins de 768 px.

## Technologies

- **React 19** + **TypeScript**
- **Vite** (serveur de développement et build)
- **React Router** (pages accueil / connexion)
- **Context API** pour l'authentification (`AuthContext`)
- **SCSS** avec la convention **BEM**
- **ESLint**

## Lancer le projet

Le site a besoin du **backend Node.js fourni par OpenClassrooms**, qui se trouve dans le dépôt de la version JavaScript.

### 1. Backend (port 5678)

```bash
git clone git@github.com:grdRaphael/OC-Projet3-Portfolio-architecte-Sophie-Bluel.git
cd OC-Projet3-Portfolio-architecte-Sophie-Bluel/Backend
npm install
npm start
```

Laisser ce terminal ouvert. La documentation de l'API (Swagger) est disponible sur http://localhost:5678/api-docs/.

### 2. Frontend (port 5173)

Dans un **second terminal** :

```bash
git clone git@github.com:grdRaphael/OC-Sophie_Bluel_REACT_version.git
cd OC-Sophie_Bluel_REACT_version
npm install
npm run dev
```

Puis ouvrir http://localhost:5173.

### Compte de test

| E-mail | Mot de passe |
| --- | --- |
| `sophie.bluel@test.tld` | `S0phie` (avec un zéro) |

## Structure

```
src/
├── API/            # Appels à l'API (projets, catégories, connexion)
├── components/     # Banner, Filters, Gallery, GalleryModal, UploadModal, Toast, Contact, Footer, Layout
├── context/        # AuthContext : token et état de connexion
├── pages/          # Home, Login
├── types/          # Types TypeScript (Work, Category)
├── utils/          # isMobile
└── index.scss      # Variables, styles globaux et animations
```

## De JavaScript à React : ce qui a changé

Les fonctionnalités sont les mêmes que dans la version JS, mais la façon de les construire est différente :

- **Décrire un état au lieu de modifier la page.** En JS, je créais et supprimais les éléments à la main (`createElement`, `append`, `remove`). En React, je décris ce qui doit s'afficher en fonction du state : par exemple, les messages d'erreur du formulaire dépendent d'un objet `errors`.
- **Le toast « Annuler ».** En JS, le minuteur était une variable dans l'écouteur de clic. En React, il est lancé dans un `useEffect` qui dépend du projet « en attente de suppression ». Sa **fonction de nettoyage** fait le `clearTimeout`, donc annuler revient simplement à remettre ce state à `null`.
- **Les animations de fermeture.** Quand un state change, React retire l'élément immédiatement, sans attendre l'animation. La sortie se fait donc en deux temps : une classe CSS lance l'animation, puis `onAnimationEnd` retire l'élément. Cela m'a fait comprendre pourquoi l'animation de fermeture de ma version JS ne s'affichait jamais : j'y retirais l'élément sans attendre la fin de l'animation.
- **Des composants qui partagent un même state.** Le projet en attente de suppression est géré dans la page d'accueil (`Home`), car la galerie, la modale et le toast en ont tous besoin.

## Pistes d'amélioration

- **Gestion des erreurs de l'API** : vérifier `res.ok` et afficher un message si l'ajout ou la suppression échoue. Aujourd'hui, l'interface suppose que l'API répond toujours correctement.
- **Session expirée** : le token expire au bout de 24 h. Il faudrait déconnecter l'utilisateur et le rediriger vers la page de connexion.
- **États de chargement et d'erreur** pour la galerie, si l'API ne répond pas.
- **Lien « contact » depuis la page de connexion** : il recharge l'accueil mais ne défile pas jusqu'à la section. Il faudrait gérer l'ancre avec React Router (`useLocation` + `useRef`).
- **Formulaire de contact** : il n'envoie pas encore de message.
- **Accessibilité** : respecter `prefers-reduced-motion` pour les animations.
- **Responsive** : ajouter un palier tablette, et définir le breakpoint à un seul endroit (mixin SCSS).

## Auteur

[grdRaphael](https://github.com/grdRaphael) — formation Intégrateur web, OpenClassrooms
