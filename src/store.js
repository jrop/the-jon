// @flow
import {createStore} from 'redux'
import PouchDB from 'pouchdb'

type reducer = (state: any, action: any) => any
const reducers: Map<string, reducer> = new Map()
function register(type: string, reducer: reducer) {
	reducers.set(type, reducer)
}
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
	apps: {
		budget: {
			bins: [],
		},
	},
})

// DB sync {{
const db = new PouchDB('app')
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
export {register}
