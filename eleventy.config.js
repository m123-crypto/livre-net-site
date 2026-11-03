export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  const published = (items) => items.filter((i) => !i.data.brouillon);
  const byOrder = (a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99);

  eleventyConfig.addCollection("services", (api) =>
    published(api.getFilteredByGlob("src/services/*.md")).sort(byOrder)
  );
  eleventyConfig.addCollection("villes", (api) =>
    published(api.getFilteredByGlob("src/villes/*.md")).sort(byOrder)
  );
  eleventyConfig.addCollection("realisations", (api) =>
    published(api.getFilteredByGlob("src/realisations/*.md")).sort(
      (a, b) => b.date - a.date
    )
  );
  eleventyConfig.addCollection("conseils", (api) =>
    published(api.getFilteredByGlob("src/conseils/*.md")).sort(
      (a, b) => b.date - a.date
    )
  );
  eleventyConfig.addCollection("offres", (api) =>
    published(api.getFilteredByGlob("src/offres/*.md")).sort(
      (a, b) => b.date - a.date
    )
  );

  eleventyConfig.addFilter("dateFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("tel", (s) => (s || "").replace(/[^+\d]/g, ""));
  eleventyConfig.addFilter("wa", (s) => {
    let n = (s || "").replace(/\D/g, "");
    if (n.startsWith("0")) n = "33" + n.slice(1);
    return n;
  });
  eleventyConfig.addFilter("absolute", (path, base) => new URL(path, base).href);
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
