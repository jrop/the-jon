import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import BibleModel from './lib/bible'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import LibraryBooks from 'material-ui/svg-icons/av/library-books'
import stackable, {IStack} from '../../stackable'

import Renderer from './renderer'

export default stackable(class Bible extends React.Component<any, any> {
	bible: BibleModel
	stack: IStack
	state: {
		loading: boolean,
		current: {
			h: string,
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			current: {
				h: 'Genesis',
			},
		}
	}

	async componentDidMount() {
		try {
			this.setState({loading: true})
			console.log('downloading...')
			const bible: any = await fetch('bible.json').then(r => r.json())
			this.bible = new BibleModel(bible)
		} catch (e) {
			console.error(e)
		} finally {
			this.setState({loading: false})
		}
	}

	onChoose() {
		console.log('choose...TODO')
	}

	render() {
		return <div style={{
			height: '100%',
			overflow: 'auto',
			display: 'flex',
			flexDirection: 'column',
		}}>
			<AppBar title="Bible" style={{
				flex: '0 0 auto',
			}}
				iconElementLeft={<IconButton onClick={() => this.stack.pop()}><ArrowBack /></IconButton>}
				iconElementRight={<IconButton onClick={() => this.onChoose()}><LibraryBooks /></IconButton>} />
			
			{this.state.loading ? <div style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<CircularProgress />
			</div> : <div style={{
				flex: '1 1 auto',
				overflow: 'auto',
				padding: '5px',
			}}>
				<Renderer bible={this.bible} source={this.state.current} />
			</div>}
		</div>
	}
})
