// @flow
import {applyMiddleware, createStore} from 'redux'
import PouchDB from 'pouchdb'
import update from 'immutability-helper'
import _ from 'lodash'

type reducer = (state: any, action: any) => any
const reducers: Map<string, reducer> = new Map()
function register(type: string, reducer: reducer) {
	reducers.set(type, reducer)
}

// actions {{
register('@@redux/INIT', state => state)
register('HYDRATE', (s, action) => {
	const {store} = action
	console.info('hydrating store:', s, store)
	return store
})
register('ADD_BIN', function (state, {bin}) {
	return update(state, {bins: {$push: [bin]}})
})
register('UPDATE_BIN', function (state, {name, bin}) {
	const index = _.findIndex(state.bins, b => b.name == name)
	return update(state, {
		bins: {
			$set: update(state.bins, {
				[index]: {$set: bin},
			}),
		},
	})
})
register('DELETE_BIN', function (state, {name}) {
	const index = _.findIndex(state.bins, b => b.name == name)
	return update(state, {
		bins: {$splice: [[index, 1]]},
	})
})
register('ADD_TXN', function (state, {bin, txn}) {
	const index = _.findIndex(state.bins, b => b.name == bin)
	return update(state, {
		bins: {
			[index]: {
				txns: {$push: [txn]},
			},
		},
	})
})
register('UPDATE_TXN', function (state, {bin, index, txn}) {
	const binIndex = _.findIndex(state.bins, b => b.name == bin)
	return update(state, {
		bins: {
			[binIndex]: {
				txns: {
					[index]: {$set: txn},
				},
			},
		},
	})
})
register('DELETE_TXN', function (state, {bin, index}) {
	const binIndex = _.findIndex(state.bins, b => b.name == bin)
	return update(state, {
		bins: {
			[binIndex]: {
				txns: {$splice: [[index, 1]]},
			},
		},
	})
})
// }}

const store = createStore(function (state: any, action: any) {
	if (reducers.has(action.type)) {
		const r = reducers.get(action.type)
		if (!r) return // to make flow happy
		return r(state, action)
	} else {
		console.warn(`No reducer found for action type: ${action.type}`, action)
		return state
	}
}, {
	loading: false,
	bins: [],
})

// DB sync {{
const db = new PouchDB('budget')
db.get('store')
	.then(doc => {
		const s = doc
		delete s._id
		delete s._rev
		store.dispatch({type: 'HYDRATE', store: s})
	})
	.catch(e => {
		db.put(Object.assign({}, store.getState(), {_id: 'store'}))
		console.warn('Cannot hydrate store', e)
	})

store.subscribe(async () => {
	const doc = await db.get('store')
	db.put(Object.assign({}, store.getState(), {_id: 'store', _rev: doc._rev}))
})
// }}

window.budget_peek_store = function() {
	db.get('store').then(console.log)
}

export default store
