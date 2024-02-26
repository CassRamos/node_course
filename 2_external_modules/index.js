const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

console.log(args)

const name = args['name']
const occupation = args['occupation']

console.log(name, occupation)

/*
Terminal
node index.js --name=<name> --occupation=<occupation> 
*/