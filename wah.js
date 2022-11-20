const ManticoreNode = require('./index')

async function main() {
    await ManticoreNode.init()
    console.log(ManticoreNode)

    let logger = () => console.log("what the fuck heck")
    process.on('exit', logger)
    process.on('beforeExit', logger)
}

main().then(ManticoreNode.exit)