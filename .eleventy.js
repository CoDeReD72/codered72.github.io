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

  eleventyConfig.addCollection('albums', function (collectionApi) {
    const albumsDir = './src/albums/';

    // Read the subdirectories within the albums directory
    const albumDirs = fs.readdirSync(albumsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Generate album data for each subdirectory
    return albumDirs.map((albumDir) => {
      const albumPath = path.join(albumsDir, albumDir);
      const photos = fs.readdirSync(albumPath)
        .filter((file) => file.endsWith('.jpg'))
        .map((file) => {
          const photoPath = path.join(albumPath, file);
          return {
            url: `/${path.relative('./src', photoPath)}`,
            alt: file.replace('.jpg', ''),
          };
        });

      return {
        url: `/${path.relative('./src', albumPath)}/index.html`,
        data: {
          title: albumDir,
          photos,
        },
      };
    });
  });

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
