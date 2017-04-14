const fs = require('mz/fs')
const usfm = require('usfm')

async function main() {
	const files = (await fs.readdir(`${__dirname}/usfm`))
		.filter(f => f.endsWith('.usfm'))
	
	const results = await Promise.all(files.map(async file => {
		const s = await fs.readFile(`${__dirname}/usfm/${file}`, 'utf-8')
		const ast = new usfm.UsfmParser(new usfm.UsfmLexer(s)).parse()
		return {file, ast}
	}))

	await fs.writeFile(`${__dirname}/../../../bible.json`, JSON.stringify(results))
}
main().catch(console.error)
