// @flow
import {applyMiddleware, createStore} from 'redux'
import PouchDB from 'pouchdb'

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
	const newState = Object.assign({}, state)
	newState.bins = [...newState.bins, bin]
	return newState
})
register('UPDATE_BIN', function (state, {name, bin}) {
	const newState = Object.assign({}, state)
	newState.bins = newState.bins.map(originalBin => {
		if (originalBin.name != name)
			return originalBin
		return bin
	})
	return newState
})
register('DELETE_BIN', function (state, {name}) {
	const newState = Object.assign({}, state)
	newState.bins = newState.bins.filter(b => b.name != name)
	return newState
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
}, applyMiddleware())

// DB sync {{
const db = new PouchDB('budget')
db.get('store')
	.then(doc => {
		const s = doc
		delete s._id
		delete s._rev
		store.dispatch({type: 'HYDRATE', store: s})
	})
	.catch(e => console.warn('Cannot hydrate store', e))

store.subscribe(async () => {
	const doc = await db.get('store')
	db.put(Object.assign({}, store.getState(), {_id: 'store', _rev: doc._rev}))
})
// }}

export default store
