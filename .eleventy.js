
module.exports = function(eleventyConfig){
    
    eleventyConfig.addPassthroughCopy("src/assets/") // Copies assets through to the site build
    eleventyConfig.addPassthroughCopy("src/css/") // Copies CSS Over

    eleventyConfig.addWatchTarget("src/css") // Eleventy watches filed in /css/ for changes 

    eleventyConfig.addCollection('posts', function (collectionApi){
        return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md')
    })

return{
    dir: {
        input: 'src',
        includes: '_includes',
        outputs: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplates: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
}

}