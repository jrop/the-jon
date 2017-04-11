import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface IStack {
	push<P>(element: React.ReactElement<P>)
	pop()
}
export interface IStackable<P, S> extends React.Component<P, S> {
	stack: IStack
}

export default function stackable<P, S>(_ComponentClass: new (props?: any) => React.Component<P, S>): new (props?: any) => IStackable<P, S> {
	const CC: any = _ComponentClass
	CC.contextTypes = CC.contextTypes || {}
	CC.contextTypes.stack = PropTypes.any

	class _StackableClass extends _ComponentClass {
		constructor(props: P) {
			super(props)
		}

		get stack() {
			return this.context.stack
		}
	}

	return _StackableClass
}
