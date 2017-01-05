// @flow
import {connect} from 'react-redux'
import React from 'react'

import BinEditor from './bin-editor'
import * as dialogs from 'material-ui-dialogs'
import {show} from 'material-ui-dialogs'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import LinearProgress from 'material-ui/LinearProgress'

import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/image/edit'

export default connect(s => s)(function Bin(props) {
	async function onDelete() {
		if (await dialogs.confirm(`Are you sure you want to delete '${props.name}'?`))
			props.dispatch({type: 'DELETE_BIN', name: props.name})
	}

	async function onEdit() {
		const newBin = await show(<BinEditor name={props.name} max={props.max} />)
		if (newBin)
			props.dispatch({type: 'UPDATE_BIN', name: props.name, bin: newBin})
	}

	return <Card style={{margin: '5px 0'}}>
		<CardHeader title={props.name}
			subtitle={`$${props.max}`}
			actAsExpander={true}
			showExpandableButton={true}/>
		<CardText>
			<LinearProgress mode="determinate" value={0} />
		</CardText>
		<CardActions expandable={true}>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}>
				<FlatButton label="Txns" style={{flex: '0 0 auto'}} />
				<FlatButton label="Add" style={{flex: '0 0 auto'}} />

				<div style={{flex: '1 0 auto', textAlign: 'right'}}>
					<IconButton onClick={() => onEdit()}><Edit /></IconButton>
					<IconButton onClick={() => onDelete()}><Delete /></IconButton>
				</div>
			</div>
		</CardActions>
	</Card>
})
