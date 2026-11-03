export default {
  layout: "layouts/service.njk",
  eleventyComputed: {
    
    permalink: (data) => (data.brouillon ? false : `/services/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.brouillon,
  },
};
