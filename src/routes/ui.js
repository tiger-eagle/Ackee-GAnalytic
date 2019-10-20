'use strict'

const { resolve } = require('path')
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const html = require('../ui/index')

const isDemo = require('../utils/isDemo')
const isProductionEnv = require('../utils/isProductionEnv')

const index = () => {

	const data = html()

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.end(await data)

	}

}

const styles = () => {

	const filePath = resolve(__dirname, '../ui/styles/index.scss')
	const data = sass(filePath, { optimize: isProductionEnv === true })

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/css; charset=utf-8')
		res.end(await data)

	}

}

const scripts = () => {

	const filePath = resolve(__dirname, '../ui/scripts/index.js')

	const babel = {
		presets: [
			[
				'@babel/preset-env', {
					targets: {
						browsers: [
							'last 2 Safari versions',
							'last 2 Chrome versions',
							'last 2 Opera versions',
							'last 2 Firefox versions'
						]
					}
				}
			]
		],
		babelrc: false
	}

	const data = js(filePath, {
		optimize: isProductionEnv === true,
		env: {
			ACKEE_DEMO: isDemo === true ? 'true' : 'false',
			NODE_ENV: isProductionEnv === true ? 'production' : 'development'
		},
		babel
	})

	return async (req, res) => {

		res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
		res.end(await data)

	}

}

module.exports = {
	index: isProductionEnv === true ? index() : (req, res) => index()(req, res),
	styles: isProductionEnv === true ? styles() : (req, res) => styles()(req, res),
	scripts: isProductionEnv === true ? scripts() : (req, res) => scripts()(req, res)
}