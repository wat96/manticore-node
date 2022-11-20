// set up python bin before imports
const path = require('path')
process.env.PYTHON_BIN = path.join(module.path, 'venv', 'bin', 'python')

class Library {
    constructor() {
        this.init = this.init.bind(this)
        this.exit = this.exit.bind(this)
    }

    async init() {
        let pythonia = require('pythonia')
        let { python } = pythonia
        this.pythonia = pythonia
        this.python = python

        let manticore = await python('manticore')
        this.manticore = manticore
    }

    async exit() {
        if (this.python) {
            this.python.exit()
        }
    }
}

module.exports = new Library()
