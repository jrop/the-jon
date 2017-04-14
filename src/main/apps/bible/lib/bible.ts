export default class Bible {
	books: {
		file: string, ast: any[], h: string,
	}[]

	constructor(books: {file: string, ast: any[]}[]) {
		this.books = books.map(book => {
			const [{h}] = book.ast.filter(node => node.h)
			return Object.assign({}, book, {h: h.join(' ')})
		})
	}
}

// if (require.main === module) {
// 	const fs = require('fs')
// 	const msg = require('msgpack-lite')
// 	const path = require('path')

// 	const books = msg.decode(fs.readFileSync(path.resolve(`${__dirname}/../../../../bible.json`)))
// 	new Bible(books)
// }
