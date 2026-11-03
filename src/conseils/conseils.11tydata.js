export default {
  layout: "layouts/article.njk",
  eleventyComputed: {
    
    permalink: (data) => (data.brouillon ? false : `/conseils/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.brouillon,
  },
};
