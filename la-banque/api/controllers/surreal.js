const { default: Surreal } = require('surrealdb.js');
const db = new Surreal('http://127.0.0.1:8080/rpc');

async function main(){
    try {

		// Signin as a namespace, database, or root user
		await db.signin({
			user: 'root',
			pass: 'root',
		});

		// Select a specific namespace / database
		await db.use({ns: 'test', db: 'test'});
        await db.query('DEFINE INDEX email ON TABLE person COLUMNS email UNIQUE;');

	} catch (e) {

		console.error('ERROR', e);

	}
}
main();

module.exports = db;