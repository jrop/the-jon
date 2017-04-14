import * as React from 'react'
import {render} from 'react-dom'

import * as colors from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Provider} from 'react-redux'
import {Stack} from 'react-activity-stack'
import store from './store'

import App from './app'

window.addEventListener('load', () => {
	injectTapEventPlugin()
	render(<MuiThemeProvider muiTheme={getMuiTheme({
		palette: {
			primary1Color: colors.deepPurple900,
			primary2Color: colors.deepPurple500,
			primary3Color: colors.grey200,
		},
	})}>
		<Provider store={store}>
			<Stack>
				<App />
			</Stack>
	</Provider>
	</MuiThemeProvider>, document.getElementById('react'))
})
