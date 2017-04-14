import * as React from 'react'
import BibleModel from './lib/bible'

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
nothing('toc1')
nothing('toc2')
nothing('toc3')

register('bk', props => <span><Node node={props.node.value} /></span>)
register('ili', props => <ul><li><Node node={props.node.ili} /></li></ul>)
register('ip', props => <p><Node node={props.node.ip} /></p>)
register('is1', props => <h2><Node node={props.node.is1} /></h2>)
register('mt1', props => <h1><Node node={props.node.mt1} /></h1>)
register('mt2', props => <h2><Node node={props.node.mt2} /></h2>)
register('mt3', props => <h3><Node node={props.node.mt3} /></h3>)

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
