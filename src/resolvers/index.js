'use strict'

const tokens = require('./tokens')
const records = require('./records')
const domains = require('./domains')
const statistics = require('./statistics')

module.exports = {
	...statistics,
	Query: {
		...domains.Query
	},
	Mutation: {
		...tokens.Mutation,
		...records.Mutation,
		...domains.Mutation
	}
}