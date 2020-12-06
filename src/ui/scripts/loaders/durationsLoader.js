import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchDurations', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				durations(interval: ${ opts.interval }, limit: 7) {
					id
					count
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.durations

	return {
		id,
		Renderer: (props) => h(RendererChart, {
			...props,
			formatter: (ms) => formatDuration(ms).toString()
		}),
		query,
		variables,
		selector,
		enhancer: (durations) => enhanceDurations(durations, 7)
	}

}