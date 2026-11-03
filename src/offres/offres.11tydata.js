export default {
  layout: "layouts/offre.njk",
  eleventyComputed: {
    
    permalink: (data) => (data.brouillon ? false : `/recrutement/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.brouillon,
  },
};
