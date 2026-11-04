export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/verif": "/" });
  eleventyConfig.ignores.add("src/verif/**");

  const published = (items) => items.filter((i) => !i.data.brouillon);
  const byOrder = (a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99);

  // Paires avant/après pour le diaporama : galerie + ancienne paire unique
  eleventyConfig.addFilter("paires", (galerie, avant, apres, legende) => {
    const out = [];
    if (avant || apres) out.push({ avant: avant || "", apres: apres || "", legende: legende || "" });
    for (const g of galerie || []) if (g && (g.avant || g.apres)) out.push({ avant: g.avant || "", apres: g.apres || "", legende: g.legende || "" });
    return out;
  });
  eleventyConfig.addCollection("servicesPro", (api) =>
    published(api.getFilteredByGlob("src/services/*.md")).filter((p) => p.data.public !== "particulier").sort(byOrder)
  );
  eleventyConfig.addCollection("servicesParticuliers", (api) =>
    published(api.getFilteredByGlob("src/services/*.md")).filter((p) => p.data.public === "particulier").sort(byOrder)
  );
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
