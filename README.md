# Ujuzai - Landing Page SaaS d'Automatisation IA

Une landing page moderne et futuriste en noir et blanc pour une startup spécialisée dans l'automatisation par intelligence artificielle.

## 🎨 Design

- **Style** : Design futuriste minimaliste en noir et blanc
- **Thème** : Support du mode sombre automatique
- **Animations** : Effets visuels fluides avec Framer Motion
- **Responsive** : Optimisé pour tous les appareils

## ✨ Fonctionnalités

### Composants UI

- **TextGenerateEffect** : Animation de texte progressive
- **ShimmerButton** : Bouton avec effet lumineux rotatif
- **MovingBorder** : Bordure animée pour les cartes
- **SparklesCore** : Effet de particules scintillantes
- **GridBackground** : Fond avec grille subtile

### Sections

1. **Navbar** : Navigation fixe avec menu mobile
2. **Hero** : Section principale avec titre animé, CTA et statistiques
3. **Features** : Grille de 6 fonctionnalités clés
4. **How It Works** : Processus en 4 étapes
5. **CTA** : Appel à l'action final
6. **Footer** : Pied de page complet avec liens

## 🚀 Démarrage

### Prérequis

- Node.js 18+
- npm ou pnpm

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build

```bash
npm run build
npm start
```

## 🛠️ Technologies

- **Framework** : Next.js 16 (App Router)
- **React** : 19.2
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **TypeScript** : Support complet

## 📁 Structure du Projet

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/
│   ├── cn.ts              # Utilitaire de classes CSS
│   ├── ui/                # Composants UI réutilisables
│   │   ├── text-generate-effect.tsx
│   │   ├── shimmer-button.tsx
│   │   ├── moving-border.tsx
│   │   ├── sparkles.tsx
│   │   └── grid-background.tsx
│   └── sections/          # Sections de la landing page
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── HowItWorks.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
```

## 🎯 Personnalisation

### Couleurs

Le thème utilise un système noir et blanc pur. Pour personnaliser :

1. Modifier les variables dans `src/app/globals.css`
2. Ajuster les classes Tailwind dans les composants

### Contenu

- **Textes** : Éditer directement dans les composants de sections
- **Icônes** : Remplacer les icônes Lucide dans les imports
- **Statistiques** : Modifier dans `Hero.tsx`

### Animations

Les animations Framer Motion peuvent être ajustées via :
- `initial`, `animate`, `exit` props
- `transition` duration et delays
- Variants personnalisés

## 📱 Responsive

La landing page est optimisée pour :
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

## 🌙 Mode Sombre

Le mode sombre s'active automatiquement selon les préférences système de l'utilisateur.
Toutes les sections sont optimisées pour les deux modes.

## 📝 License

MIT License - Libre d'utilisation pour votre projet.

## 🤝 Support

Pour toute question ou support, contactez l'équipe Ujuzai.

---

Créé avec ❤️ pour révolutionner l'automatisation par IA
