import {createStore} from 'redux'

type reducer = (state: any, action: any) => any
const reducers: Map<string, reducer> = new Map()
function register(type: string, reducer: reducer) {
	reducers.set(type, reducer)
}

register('HYDRATE', (s, action) => {
	const {store} = action
	console.info('hydrating store:', s, store)
	return store
})

const store = createStore(function (state: any, action: any) {
	if (reducers.has(action.type)) {
		const r = reducers.get(action.type)
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
const lastStore = localStorage.getItem('store')
if (lastStore) {
	store.dispatch({
		type: 'HYDRATE',
		store: JSON.parse(lastStore),
	})
}
store.subscribe(() =>
	localStorage.setItem('store', JSON.stringify(store.getState())))
// }}

;(window as any).budget_peek_store = function() {
	console.warn('TODO')
	// db.get('store').then(console.log)
}

export default store
export {register}
