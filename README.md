# Site Livré Net

Site de l'entreprise Livré Net (nettoyage de fin de chantier et entretien de bureaux), construit avec Eleventy et administré avec Decap CMS.

## Modifier le contenu

Allez sur **https://livre-net.fr/admin/**, connectez-vous, modifiez, puis cliquez sur **Publier**. Le site est mis à jour en 1 à 2 minutes.

## Développement

```
npm install
npm start      # aperçu local sur http://localhost:8080
npm run build  # génère le site dans _site/
```

Hébergement : Netlify (build `npm run build`, dossier `_site`). Admin : Netlify Identity + Git Gateway. Formulaires : Netlify Forms (`devis`, `candidature`).
