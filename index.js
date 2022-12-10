// set up python bin before imports
const path = require('path')
process.env.PYTHON_BIN = path.join(module.path, 'venv', 'bin', 'python')
const PYTHON_MODULES = path.join(module.path, 'py', '__init__.py')
const JS_MODULES = path.join(module.path, 'js', 'modules')

class Library {
    constructor() {
        this.init = this.init.bind(this)
        this.exit = this.exit.bind(this)
        process.on('exit', this.exit)

        // pull in our sync custom modules
        this.custom = {}
        this.custom.js = require(JS_MODULES)
        this.custom.PluginFactory = new this.custom.js.plugins.PluginFactory(this)
    }

    async init() {
        let pythonia = require('pythonia')
        let { python } = pythonia
        this.pythonia = pythonia
        this.python = python

        let manticore = await python('manticore')
        this.manticore = manticore

        // pull in our async custom modules
        this.custom.py = await this.python(PYTHON_MODULES)
        this.custom.js.utils = new this.custom.js.UtilsLibrary(this)
    }

    async exit() {
        if (this.python) {
            this.python.exit()
        }
    }
}

module.exports = new Library()
