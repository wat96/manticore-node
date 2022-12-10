class UtilsLibrary {
    constructor(baseModule) {
        this.baseModule = baseModule
    }

    async getPythonUtils() {
        return await this.baseModule.custom.py.utils
    }

    async createContractFromInitCode(mEVM, { deployerAddress, balance=0, address, initCode, name, deployGas }) {
        let pythonUtils = await this.getPythonUtils()
        
        return await pythonUtils.createContract(mEVM, deployerAddress, balance, address, initCode, name, deployGas)
    }

    // default nonce value is set to 1 because contracts start a 1 nonce
    async createContractFromByteCode(mEVM, { balance=0, address, bytecode, name, nonce=1 }) {
        let pythonUtils = await this.getPythonUtils()
        
        return await pythonUtils.createAccount(mEVM, balance, address, bytecode, name, nonce)
    }

    async createAccount(mEVM, { balance=0, accountAddress, name, nonce }) {
        let pythonUtils = await this.getPythonUtils()
        
        return await pythonUtils.createAccount(mEVM, balance, accountAddress, null, name, nonce)
    }

    async transaction(mEVM, { caller, callee, value=0, data='', gas, gasPrice=1 }) {
        let pythonUtils = await this.getPythonUtils()
        
        return await pythonUtils.transaction(mEVM, caller, callee, value, data, gas, gasPrice)
    }
}

module.exports = UtilsLibrary

