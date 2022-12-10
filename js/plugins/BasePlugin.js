const _ = require('lodash')

class BasePlugin {
    constructor(pluginModule) {
        this.pluginModule = pluginModule
        this.inst = null
    }

    static async extractModule(baseNodeModule) {
        return await _.get(baseNodeModule, 'custom.py.plugins.BasePlugin')
    }

    async initInstance() {
        this.inst = await this.pluginModule()
    }

    async registerCallbacks() {
        const cbsToRegister = [
            // Core callbacks
            'will_fork_state_callback',
            'did_fork_state_callback',
            'will_load_state_callback',
            'did_load_state_callback',
            'will_run_callback',
            'did_run_callback',
            // worker callbacks
            'will_start_worker_callback',
            'will_terminate_state_callback',
            'did_terminate_state_callback',
            'will_kill_state_callback',
            'did_kill_state_callback',
            'did_terminate_worker_callback',
            // EVM callbacks
            'will_decode_instruction_callback',
            'will_evm_execute_instruction_callback',
            'did_evm_execute_instruction_callback',
            'did_evm_read_memory_callback',
            'did_evm_write_memory_callback',
            'on_symbolic_sha3_callback',
            'on_concreate_sha3_callback',
            'did_evm_read_code_callback',
            'will_evm_read_storage_callback',
            'did_evm_read_storage_callback',
            'will_evm_write_storage_callback',
            'did_evm_write_storage_callback',
            'will_open_transaction_callback',
            'did_open_transaction_callback',
            'will_close_transaction_callback',
            'did_close_transaction_callback'
        ]

        for (let cb of cbsToRegister) {
            if (_.isFunction(this[cb])) {
                await this.inst.register_cb(cb, this[cb].bind(this))
            }
        }
    }

    async initialize() {
        if (!this.inst) await this.initInstance()

        await this.registerCallbacks()
    }

    setBaseLibrary(baseLibrary) { 
        this.baseLibrary = baseLibrary 
    }

    getJsUtils() {
        return this.baseLibrary.custom.js.utils
    }

    async getPythonUtils() {
        return await this.baseLibrary.custom.py.utils
    }

    getPythonInst() {
        return this.inst
    }
}

module.exports = BasePlugin