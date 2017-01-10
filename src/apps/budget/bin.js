// @flow
import {connect} from 'react-redux'
import React from 'react'

import BinEditor from './bin-editor'
import * as dialogs from 'material-ui-dialogs'
import {show} from 'material-ui-dialogs'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import LinearProgress from 'material-ui/LinearProgress'
import stackable from '../../stackable'

import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/image/edit'

import Txns from './txns'
import TxnEditor from './txn-editor'

export default connect(s => s)(stackable(class Bin extends React.Component {
	stack: any
	onTxns() {
		this.stack.push(<Txns bin={this.props.name}/>)
	}

	async onAddTxn() {
		const txn = await show(<TxnEditor />)
		if (!txn) return
		this.props.dispatch({type: 'ADD_TXN', bin: this.props.name, txn})
	}

	async onEdit() {
		const newBin = await show(<BinEditor name={this.props.name} max={this.props.max} />)
		newBin.txns = this.props.txns
		if (newBin)
			this.props.dispatch({type: 'UPDATE_BIN', name: this.props.name, bin: newBin})
	}

	async onDelete() {
		if (await dialogs.confirm(`Are you sure you want to delete '${this.props.name}'?`))
			this.props.dispatch({type: 'DELETE_BIN', name: this.props.name})
	}

	render() {
		const sAmount = n => `$${n}`.replace(/^\$-/, '-$')
		const spent = this.props.txns.reduce((acc, t) => acc + t.amt, 0)
		const progress = spent / this.props.max * 100

		return <Card style={{margin: '5px 0'}}>
			<CardHeader title={this.props.name}
				subtitle={`${sAmount(spent)} / ${sAmount(this.props.max)}: ${sAmount(this.props.max - spent)} left`}
				actAsExpander={true}
				showExpandableButton={true} />
			<CardText>
				<LinearProgress
					mode="determinate"
					value={progress}
					color={Math.abs(spent) > Math.abs(this.props.max) ? 'red' : null} />
			</CardText>
			<CardActions expandable={true}>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}>
					<FlatButton label="Txns" style={{flex: '0 0 auto'}} onClick={() => this.onTxns()} />
					<FlatButton label="Add" style={{flex: '0 0 auto'}} onClick={() => this.onAddTxn()} />

					<div style={{flex: '1 0 auto', textAlign: 'right'}}>
						<IconButton onClick={() => this.onEdit()}><Edit /></IconButton>
						<IconButton onClick={() => this.onDelete()}><Delete /></IconButton>
					</div>
				</div>
			</CardActions>
		</Card>
	}
}))
