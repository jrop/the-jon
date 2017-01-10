// @flow
import {register} from '../../store'
import update from 'immutability-helper'
import _ from 'lodash'

register('HYDRATE', (s, action) => {
	const {store} = action
	console.info('hydrating store:', s, store)
	return store
})
register('ADD_BIN', function (state, {bin}) {
	return update(state, {
		apps: {
			budget: {
				bins: {$push: [bin]},
			},
		},
	})
})
register('UPDATE_BIN', function (state, {name, bin}) {
	console.log(state, name, bin)
	const index = _.findIndex(state.apps.budget.bins, b => b.name == name)
	return update(state, {
		apps: {
			budget: {
				bins: {
					$set: update(state.apps.budget.bins, {
						[index]: {$set: bin},
					}),
				},
			},
		},
	})
})
register('DELETE_BIN', function (state, {name}) {
	const index = _.findIndex(state.apps.budget.bins, b => b.name == name)
	return update(state, {
		apps: {
			budget: {
				bins: {$splice: [[index, 1]]},
			},
		},
	})
})
register('ADD_TXN', function (state, {bin, txn}) {
	const index = _.findIndex(state.apps.budget.bins, b => b.name == bin)
	return update(state, {
		apps: {
			budget: {
				bins: {
					[index]: {
						txns: {$push: [txn]},
					},
				},
			},
		},
	})
})
register('UPDATE_TXN', function (state, {bin, index, txn}) {
	const binIndex = _.findIndex(state.apps.budget.bins, b => b.name == bin)
	return update(state, {
		apps: {
			budget: {
				bins: {
					[binIndex]: {
						txns: {
							[index]: {$set: txn},
						},
					},
				},
			},
		},
	})
})
register('DELETE_TXN', function (state, {bin, index}) {
	const binIndex = _.findIndex(state.apps.budget.bins, b => b.name == bin)
	return update(state, {
		apps: {
			budget: {
				bins: {
					[binIndex]: {
						txns: {$splice: [[index, 1]]},
					},
				},
			},
		},
	})
})
