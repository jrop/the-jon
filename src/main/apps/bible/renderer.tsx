import * as React from 'react'
import BibleModel from './lib/bible'
import Dialog from 'material-ui/Dialog'

const RENDERERS: Map<string, any> = new Map()
function register(type: string, c: any) {
	RENDERERS.set(type, c)
}
function renderer(node: any) {
	if (node.type)
		return RENDERERS.get(node.type)
	const [key] = Object.keys(node)
	return RENDERERS.get(key)
}
const nothing = (type: string) => register(type, () => <span></span>)

nothing('id')
nothing('ide')
nothing('h')
nothing('nb') // TODO?
nothing('toc1')
nothing('toc2')
nothing('toc3')

register('b', props => <div>&nbsp;</div>)
register('bk', props => <span><Node node={props.node.value} /></span>)
register('c', props => <div>
	<h3 style={{display: 'inline-block'}}>Chapter {props.node.num}</h3>
	<Node node={props.node.content} />
</div>)
register('f', props => <Footnote {...props} />)
register('ili', props => <ul><li><Node node={props.node.ili} /></li></ul>)
register('ip', props => <p><Node node={props.node.ip} /></p>)
register('is1', props => <h2><Node node={props.node.is1} /></h2>)
register('mt1', props => <h1><Node node={props.node.mt1} /></h1>)
register('mt2', props => <h2><Node node={props.node.mt2} /></h2>)
register('mt3', props => <h3><Node node={props.node.mt3} /></h3>)
register('p', props => <br />)
register('q1', props => <span><br /></span>)
register('q2', props => <span><br />&nbsp;&nbsp;&nbsp;&nbsp;</span>)
register('v', props => <span>
	<sup><small>{props.node.num}&nbsp;</small></sup>
	<Node node={props.node.value} />
</span>)

class Footnote extends React.Component<any, any> {
	state: {visible: boolean}
	constructor(props) {
		super(props)
		this.state = {visible: false}
	}
	render() {
		const text = this.props.node.value
			.filter(n => typeof n == 'string' || n.ft)
			.map(n => typeof n == 'string' ? n : n.ft)
		return <span>
			<a href="javascript: void(0)" onClick={() => this.setState({visible: true})}>*</a>&nbsp;
			<Dialog open={this.state.visible}
				onRequestClose={() => this.setState({visible: false})}>
				{text}
			</Dialog>
		</span>
	}
}

function Node(props: {node: any}) {
	if (Array.isArray(props.node)) {
		return <span>
			{props.node.map((node, i) => <Node key={i} node={node} />)}
		</span>
	} else if (typeof props.node == 'string') {
		return <span>{props.node}</span>
	}

	const C = renderer(props.node)
	if (C)
		return React.createElement(C, {node: props.node})

	console.warn(props.node)
	return <div>{JSON.stringify(props.node)}</div>
}

export default class Renderer extends React.Component<any, any> {
	props: {
		bible: BibleModel,
		source: any,
	}

	render() {
		const source: {
			h: string
		} = this.props.source

		const [book] = this.props.bible.books.filter(book => book.h.trim() == this.props.source.h.trim())
		return <div>
			{book.ast.map((node, i) => <Node key={i} node={node} />)}
		</div>
	}
}
