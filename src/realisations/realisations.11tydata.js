export default {
  layout: "layouts/realisation.njk",
  eleventyComputed: {
    
    permalink: (data) => (data.brouillon ? false : `/realisations/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.brouillon,
  },
};
