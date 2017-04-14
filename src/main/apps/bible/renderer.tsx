import * as React from 'react'
import BibleModel from './lib/bible'

function space(els: any[]) {
	const newEls = []
	els.forEach((e, i) => {
		newEls.push(e)
		if (i + 1 < els.length)
			newEls.push(<span key={els.length + i}>&nbsp;</span>)
	})
	return newEls
}

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
nothing('h')
nothing('toc1')
nothing('toc2')
nothing('toc3')

register('bk', props => <span><Node node={props.node.value} /></span>)
register('ip', props => <p><Node node={props.node.ip} /></p>)
register('is1', props => <h2><Node node={props.node.is1} /></h2>)
register('mt1', props => <h1><Node node={props.node.mt1} /></h1>)

function Node(props: {node: any}) {
	if (Array.isArray(props.node)) {
		return <span>
			{space(props.node.map((node, i) => <Node key={i} node={node} />))}
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

		const [book] = this.props.bible.books.filter(book => book.h == this.props.source.h)
		return <div>
			{book.ast.map((node, i) => <Node key={i} node={node} />)}
		</div>
	}
}
