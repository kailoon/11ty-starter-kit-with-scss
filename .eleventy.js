const { DateTime } = require('luxon')
const fs = require('fs')
const pluginNavigation = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')
const markdownitlinkatt = require('markdown-it-link-attributes')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/assets/scss/')

	eleventyConfig.addPassthroughCopy('./src/assets/images/')
	eleventyConfig.addPassthroughCopy('./src/assets/fonts/')

	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(pluginSyntaxHighlight)

	eleventyConfig.setDataDeepMerge(true)

	/* Markdown Overrides */
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true
	})
		.use(markdownitlinkatt, {
			// update this url for external link detection
			pattern: /^(?!(https:\/\/kailoon\.com|#)).*$/gm,
			attrs: {
				target: '_blank',
				rel: 'noreferrer'
			}
		})
		.use(markdownItAnchor, {
			permalink: true,
			permalinkClass: '',
			permalinkSymbol: '#',
			permalinkAttrs: (slug, state) => ({
				'aria-label': `permalink to ${slug}`,
				title: 'Anchor link for easy sharing.'
			})
		})
	eleventyConfig.setLibrary('md', markdownLibrary)

	eleventyConfig.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
	})

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
	})

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter('head', (array, n) => {
		if (n < 0) {
			return array.slice(n)
		}

		return array.slice(0, n)
	})

	eleventyConfig.addFilter('min', (...numbers) => {
		return Math.min.apply(null, numbers)
	})

	return {
		dir: {
			includes: '_components',
			input: 'src',
			layouts: '_layouts',
			output: '_site'
		},
		//Allow using markup and njk features in markdown
		markdownTemplateEngine: 'njk',
		templateFormats: ['njk', 'md']
	}
}
