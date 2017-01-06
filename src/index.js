// @flow
import 'babel-polyfill'
import AppBar from 'material-ui/AppBar'
import Budget from './apps/budget'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import * as colors from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import {render} from 'react-dom'
import {Stack} from 'react-activity-stack'
import stackable from './stackable'

const App = stackable(class extends React.Component {
	render() {
		return <div>
			<AppBar iconElementLeft={<div />} title="The Jon" />

			<p style={{textAlign: 'center'}}>Applications:</p>

			<Card>
				<CardHeader title="Budget" subtitle="$$$" avatar="http://www.hqtap.com/images/m-icon-15.png" />
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

window.addEventListener('load', () => {
	injectTapEventPlugin()
	render(<MuiThemeProvider muiTheme={getMuiTheme({
		palette: {
			primary1Color: colors.deepPurple900,
			primary2Color: colors.deepPurple500,
			primary3Color: colors.grey200,
		},
	})}>
		<Stack>
			<App />
			<Budget />
		</Stack>
	</MuiThemeProvider>, document.getElementById('react'))
})
