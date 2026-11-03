export default {
  layout: "layouts/ville.njk",
  eleventyComputed: {
    titre: (data) => data.titre || `Nettoyage à ${data.nom}`,
    permalink: (data) => (data.brouillon ? false : `/zones/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.brouillon,
  },
};
