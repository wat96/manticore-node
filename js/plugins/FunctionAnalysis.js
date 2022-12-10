const BasePlugin = require('./BasePlugin')

const FUNC_SELECT_SIZE = 4
const SELECTOR_NAME = 'selector'
const WAD = 10**18

class FunctionAnalysis extends BasePlugin {
    constructor(pluginModule, mEVM) {
        super(pluginModule)
        this.mEVM = mEVM
    }

    async solveStateForData(states, symbol) {
        let pyUtils = await this.getPythonUtils()
        let res = []

        for await (let state of states) {
            let sol = await state.solve_one(symbol)

            res.push(await pyUtils.binToHex(sol))
        }
        
        return res
    }
    
    async analyze(address) {
        let jsUtils = this.getJsUtils()

        let funcSelectorSymbol = await this.mEVM.make_symbolic_buffer(FUNC_SELECT_SIZE, SELECTOR_NAME)
        let accountCall = await jsUtils.createAccount(this.mEVM, { balance: WAD })
        await jsUtils.transaction(this.mEVM, {
            caller: accountCall, 
            callee: address, 
            data: funcSelectorSymbol
        })

        // use states to compute found functions
        let allStates = await this.mEVM.all_states
        let foundFunctions = await this.solveStateForData(allStates, funcSelectorSymbol)
        
        // clear all states created from analysis
        await this.mEVM.remove_all()

        // get result and clear class data
        return foundFunctions
    }
}

module.exports = FunctionAnalysis