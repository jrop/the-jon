import React from 'react'

export default function stackable(_ComponentClass) {
	_ComponentClass.contextTypes = _ComponentClass.contextTypes || {}
	_ComponentClass.contextTypes.stack = React.PropTypes.any

	class _StackableClass extends _ComponentClass {
		get stack() {
			return this.context.stack
		}
	}

	return _StackableClass
}
