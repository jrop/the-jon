import {connect} from 'react-redux'
import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import stackable, {IStack} from '../../stackable'

import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import * as dialogs from 'material-ui-dialogs'
import {show} from 'material-ui-dialogs'
import TxnEditor from './txn-editor'

export default connect(s => s.apps.budget)(stackable(class Txns extends React.Component<any, any> {
	stack: IStack
	async onEdit(txn, index) {
		const newTxn = await show(<TxnEditor txn={txn} />)
		if (!newTxn) return
		this.props.dispatch({type: 'UPDATE_TXN', bin: this.props.bin, index, txn: newTxn})
	}

	async onDelete(txn, index) {
		if (!await dialogs.confirm(`Are you sure you want to delete this transaction? (${txn.desc} [${txn.amt}])`))
			return
		this.props.dispatch({type: 'DELETE_TXN', bin: this.props.bin, index})
	}

	render() {
		const [bin] = this.props.bins.filter(b => b.name == this.props.bin)
		const {txns} = bin
		return <div>
			<AppBar title="Transactions"
				iconElementLeft={<IconButton onClick={() => this.stack.pop()}><ArrowBack /></IconButton>} />

			{txns.map((t, i) => <Card key={i} style={{margin: '5px 0'}}>
				<CardHeader actAsExpander={true} showExpandableButton={true}
					title={t.desc}
					subtitle={t.amt} />
				<CardActions expandable={true}>
					<FlatButton label="Edit" onClick={() => this.onEdit(t, i)} primary />
					<FlatButton label="Delete" onClick={() => this.onDelete(t, i)} secondary />
				</CardActions>
			</Card>)}

			{txns.length == 0 ? <p style={{textAlign: 'center'}}>Nothing here!</p> : null}
		</div>
	}
}))
