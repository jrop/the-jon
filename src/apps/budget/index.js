// @flow
import AddBox from 'material-ui/svg-icons/content/add-box'
import AppBar from 'material-ui/AppBar'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import * as dialogs from 'material-ui-dialogs'
import {Dialog, Content, Actions, defer, show} from 'material-ui-dialogs'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import LinearProgress from 'material-ui/LinearProgress'
import PouchDB from 'pouchdb'
import React from 'react'
import Sort from 'material-ui/svg-icons/content/sort'
import stackable from '../../stackable'
import TextField from 'material-ui/TextField'

class BinDialog extends React.Component {
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
		return <Dialog ref="dlg" title="Bin">
			<Content>
				<TextField hintText="Name" floatingLabelText="Name" name="name" ref="name" />
				<TextField hintText="Dollar ammount" floatingLabelText="Dollar ammount" name="max" ref="max" />
			</Content>
			<Actions>
				<FlatButton label="Cancel" secondary onClick={() => this._close(true)} />
				<FlatButton label="Okay" primary onClick={() => this._close(false)} />
			</Actions>
		</Dialog>
	}
}

function Bin(props) {
	return <Card style={{margin: '5px 0'}}>
		<CardHeader title={props.name}
			subtitle={`$${props.max}`}
			actAsExpander={true}
			showExpandableButton={true}/>
		<CardText>
			<LinearProgress mode="determinate" value={0} />
		</CardText>
		<CardActions expandable={true}>
			<FlatButton label="Txns" />
			<FlatButton label="Add" />
		</CardActions>
	</Card>
}

export default stackable(class Budget extends React.Component {
	state: {
		bins: Array<any>;
	};

	constructor(props) {
		super(props)
		this.state = {bins: [{
			name: 'Fuel', max: -150, txns: [],
		}, {
			name: 'Cell Phones', max: -50, txns: [],
		}]}
	}

	async addBin() {
		const bin = await show(<BinDialog />)
		if (!bin) return
		const bins = [...this.state.bins, bin]
		this.setState({bins})
	}

	render() {
		return <div>
			<AppBar title="Budget"
				iconElementLeft={<IconButton onClick={() => this.stack.pop()}><ArrowBack /></IconButton>}
				iconElementRight={<div>
					<IconButton onClick={() => console.log('sort')}><Sort color="white" /></IconButton>
					<IconButton onClick={() => this.addBin()}><AddBox color="white" /></IconButton>
				</div>} />

			{this.state.bins.map((bin, i) => <Bin key={i} {...bin} />)}
		</div>
	}
})
