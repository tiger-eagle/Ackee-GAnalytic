import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import PresentationIconList from '../presentations/PresentationIconList'
import PresentationEmptyState from '../presentations/PresentationEmptyState'

const textLabel = (item) => {

	const defaultLabel = 'Last 7 days'

	if (item == null) return defaultLabel
	if (item.count == null) return defaultLabel

	return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

}

const CardViews = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(undefined)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(undefined)

	const presentation = (() => {

		const hasItems = props.items.length > 0

		if (hasItems === true) return h(PresentationIconList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {}, 'No referrers')

	})()

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true
			})
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					small: true,
					className: 'color-white'
				}, props.headline),
				h(Text, {
					spacing: false
				}, textLabel(props.items[active])),
				presentation
			)
		)
	)

}

CardViews.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
}

export default CardViews