module.exports = function(eleventyConfig){
    
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