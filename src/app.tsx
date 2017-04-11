import * as React from 'react'
import stackable, {IStack} from './stackable'

import AppBar from 'material-ui/AppBar'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import * as dialogs from 'material-ui-dialogs'

import Bible from './apps/bible'
import Budget from './apps/budget'

export default stackable(class extends React.Component<any, any> {
	stack: IStack
	render() {
		return <div>
			<AppBar iconElementLeft={<div />} title="The Jon" />

			<p style={{textAlign: 'center'}}>Applications:</p>

			<Card style={{marginBottom: '5px'}}>
				<CardHeader title="Bible" subtitle="read | plan" avatar="icons/bible.svg" />
				<CardText>
					Read the WEB version (coming soon), and track your one-year plan.
				</CardText>
				<CardActions>
					<FlatButton label="Read" onClick={() => this.stack.push(<Bible />)}/>
					<FlatButton label="Plan" onClick={() => dialogs.alert('Coming soon')}/>
				</CardActions>
			</Card>

			<Card>
				<CardHeader title="Budget" subtitle="$$$" avatar="icons/piggy-bank.svg" />
				<CardText>
					A supplemental banking-app
				</CardText>
				<CardActions>
					<FlatButton label="Open" onClick={() => this.stack.push(<Budget />)}/>
				</CardActions>
			</Card>
		</div>
	}
})
