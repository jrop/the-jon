import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'

import stackable, {IStack} from '../../stackable'

export default stackable(class Bible extends React.Component<any, any> {
	stack: IStack
	render() {
		return <div>
			<AppBar title="Bible"
				iconElementLeft={<IconButton onClick={() => this.stack.pop()}><ArrowBack /></IconButton>}/>
		</div>
	}
})
