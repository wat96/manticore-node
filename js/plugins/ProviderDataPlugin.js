const _ = require('lodash')
const BasePlugin = require('./BasePlugin')

class ProviderDataPlugin extends BasePlugin {
    constructor(pluginModule, provider) {
        super(pluginModule)
        this.provider = provider

        // make sure functions are bound
        this.getContractCB = this.getContractCB.bind(this)
        this.getStorageCB = this.getStorageCB.bind(this)
    }

    static async extractModule(baseNodeModule) {
        return await _.get(baseNodeModule, 'custom.py.plugins.ProviderData')
    }

    async initInstance() {
        await super.initInstance()
        
        // register provider callbacks
        await this.inst.add_getContractCB(this.getContractCB)
        await this.inst.add_getStorageCB(this.getStorageCB)
    }

    async getContractCB(address) {
        return {
            address,
            code: await this.provider.getCode(address),
            balance: await this.provider.getBalance(address),
            nonce: await this.provider.getTransactionCount(address)
        }
    }
    
    async getStorageCB(address, offset) {
        return await this.provider.getStorageAt(address, offset)
    }

    async registerAddress(address) {
        await this.inst.register_address(address)
    }
}

module.exports = ProviderDataPlugin