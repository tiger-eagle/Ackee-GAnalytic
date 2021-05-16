import { useMemo } from 'react'
import { useQuery } from '@apollo/client'

import status from '../../utils/status'

export default (query, selector, enhancer, opts) => {

	const { loading, data } = useQuery(query, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-and-network',
		...opts
	})

	const selection = useMemo(() => {
		return selector(data)
	}, [ data ])

	const _value = useMemo(() => {
		return enhancer(selection)
	}, [ selection ])

	const _status = useMemo(() => {
		return status(selection, loading)
	}, [ selection, loading ])

	return {
		value: _value,
		status: _status
	}

}