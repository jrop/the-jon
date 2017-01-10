// @flow
import './store'
import AddBox from 'material-ui/svg-icons/content/add-box'
import AppBar from 'material-ui/AppBar'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {Provider} from 'react-redux'
import React from 'react'
import {show} from 'material-ui-dialogs'
import Sort from 'material-ui/svg-icons/content/sort'
import stackable from '../../stackable'

import BinEditor from './bin-editor'
import Bin from './bin'

export default connect(s => s.apps.budget)(stackable(class Budget extends React.Component {
	stack: any
	constructor(props) {
		super(props)
	}

	async addBin() {
		const bin = await show(<BinEditor />)
		if (!bin) return
		this.props.dispatch({type: 'ADD_BIN', bin})
	}

	render() {
		return <div>
			<AppBar title="Budget"
				iconElementLeft={<IconButton onClick={() => this.stack.pop()}><ArrowBack /></IconButton>}
				iconElementRight={<div>
					<IconButton onClick={() => this.addBin()}><AddBox color="white" /></IconButton>
				</div>} />

			{this.props.bins.map((bin, i) => <Bin key={i} {...bin} />)}
		</div>
	}
}))
