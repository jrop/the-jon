// @flow
import React from 'react'

import * as dialogs from 'material-ui-dialogs'
import {Dialog, Content, Actions, defer} from 'material-ui-dialogs'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class BinEditor extends React.Component {
	deferred: any
	promise: Promise<any>

	constructor(props) {
		super(props)
		this.deferred = defer()
		this.promise = this.deferred.promise
	}
	_close(cancel) {
		if (cancel) {
			this.deferred.resolve(null)
			this.refs.dlg.close()
			return
		}

		const max = parseFloat(this.refs.max.getValue())
		if (isNaN(max))
			return dialogs.alert(`'${this.refs.max.getValue()}' is not a number.  Please enter a number.`)

		this.deferred.resolve({
			name: this.refs.name.getValue(),
			max,
			txns: [],
		})
		this.refs.dlg.close()
	}
	render() {
		const name = this.props.name || ''
		const max = this.props.max || ''
		return <Dialog ref="dlg" title="Bin">
			<Content>
				<TextField hintText="Name" floatingLabelText="Name" defaultValue={name} name="name" ref="name" />
				<TextField hintText="Dollar amount" floatingLabelText="Dollar ammount" defaultValue={max} name="max" ref="max" />
			</Content>
			<Actions>
				<FlatButton label="Cancel" secondary onClick={() => this._close(true)} />
				<FlatButton label="Okay" primary onClick={() => this._close(false)} />
			</Actions>
		</Dialog>
	}
}
