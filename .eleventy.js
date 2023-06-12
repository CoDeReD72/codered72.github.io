const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/"); // Copies assets through to the site build
  eleventyConfig.addPassthroughCopy("src/css/"); // Copies CSS Over

  eleventyConfig.addWatchTarget("src/css"); // Eleventy watches files in /css/ for changes

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md");
  });

  eleventyConfig.addCollection("recentPosts", (collection) =>
    collection.getFilteredByGlob("src/blog/posts/**/*.md").reverse().slice(0, 5)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
