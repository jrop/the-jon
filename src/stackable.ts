import * as React from 'react'
import * as PropTypes from 'prop-types'

export default function stackable<P, S>(_ComponentClass: new (props: any) => React.Component<P, S>) {
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
