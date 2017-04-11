import * as React from 'react'

import * as dialogs from 'material-ui-dialogs'
import {Dialog, Content, Actions, defer} from 'material-ui-dialogs'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class TxnEditor extends React.Component<any, any> {
	deferred: any
	promise: Promise<any>
	constructor(props: any) {
		super(props)
		this.deferred = defer()
		this.promise = this.deferred.promise
	}

	async onDone(cancelled: boolean) {
		const close = result => {
			this.deferred.resolve(result)
			;(this.refs.dlg as any).close()
		}
		if (cancelled)
			return close(null)

		const amt = parseFloat((this.refs.amt as any).getValue())
		if (isNaN(amt))
			return await dialogs.alert(`'${(this.refs.amt as any).getValue()}' is not a valid number`)
		close({
			desc: (this.refs.desc as any).getValue(),
			amt,
		})
	}

	render() {
		const txn = this.props.txn || {desc: '', amt: ''}
		return <Dialog ref="dlg" title="Transaction" autoScrollBodyContent={true}>
			<Content>
				<TextField hintText="Description"
					floatingLabelText="Description"
					defaultValue={txn.desc}
					name="desc"
					ref="desc"
					style={{maxWidth: '100%'}} />
				<TextField hintText="Amount"
					floatingLabelText="Amount"
					defaultValue={txn.amt}
					name="amt"
					ref="amt"
					style={{maxWidth: '100%'}} />
			</Content>
			<Actions>
				<FlatButton label="Cancel" onClick={() => this.onDone(true)} secondary />
				<FlatButton label="Okay" onClick={() => this.onDone(false)} primary />
			</Actions>
		</Dialog>
	}
}
