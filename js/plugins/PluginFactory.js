class PluginFactory {
    constructor(baseModule) {
        this.baseModule = baseModule
    }

    async createPluginClass(pluginCls, ...args) {
        let pluginModule = await pluginCls.extractModule(this.baseModule)
        let pluginInst = new pluginCls(pluginModule, ...args)
        pluginInst.setBaseLibrary(this.baseModule)

        await pluginInst.initialize()
        return pluginInst
    }
}

module.exports = PluginFactory