import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
// import { useHotkeys } from 'react-hotkeys-hook'

import * as events from '../../../../constants/events'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import shortId from '../../utils/shortId'

const ModalEventEdit = (props) => {

	// Currently not possible:
	// https://github.com/JohannesKlauss/react-hotkeys-hook/issues/276
	// useHotkeys('esc', props.closeModal, {
	// 	filter: () => props.current === true
	// })

	const [ inputs, setInputs ] = useState({
		title: props.title,
		type: props.type
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const copyInput = (e) => {
		e.target.select()
		document.execCommand('copy')
	}

	const updateEvent = (e) => {
		e.preventDefault()
		props.updateEvent(props.id, inputs).then(props.closeModal)
	}

	const deleteEvent = (e) => {
		e.preventDefault()
		const c = confirm(`Are you sure you want to delete the event "${ props.title }"? This action cannot be undone.`)
		if (c === true) props.deleteEvent(props.id, inputs).then(props.closeModal)
	}

	const titleId = shortId()
	const typeId = shortId()
	const idId = shortId()
	const embedId = shortId()

	return (
		h('form', { className: 'card', onSubmit: updateEvent },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Event title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: props.fetching === true,
					focused: true,
					placeholder: 'Event title',
					value: inputs.title,
					onChange: onChange('title')
				}),

				h(Label, { htmlFor: typeId }, 'Event type'),

				h(Select, {
					id: typeId,
					required: true,
					disabled: props.fetching === true,
					value: inputs.type,
					items: [
						{
							value: events.EVENTS_TYPE_CHART,
							label: 'Chart'
						},
						{
							value: events.EVENTS_TYPE_LIST,
							label: 'List'
						}
					],
					onChange: onChange('type')
				}),

				h(Label, { htmlFor: idId }, 'Event id'),

				h(Input, {
					type: 'text',
					id: idId,
					readOnly: true,
					placeholder: 'Event id',
					value: props.id,
					onFocus: copyInput
				}),

				h(Label, { htmlFor: embedId }, 'Embed code'),

				h(Textarea, {
					type: 'text',
					id: embedId,
					readOnly: true,
					rows: 4,
					value: `ackeeTracker.create`,
					onFocus: copyInput
				})

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button link',
					onClick: props.closeModal
				}, 'Close'),

				h('div', {
					className: 'card__separator'
				}),

				h('button', {
					type: 'button',
					className: 'card__button link color-destructive',
					onClick: deleteEvent
				}, 'Delete'),

				h('div', {
					className: 'card__separator'
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true
				}, props.fetching === true ? h(Spinner) : 'Edit')

			)
		)
	)

}

ModalEventEdit.propTypes = {
	current: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalEventEdit