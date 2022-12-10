const path = require('path')

const UtilsLibrary = require(path.join(module.path, 'utils'))
const pluginsPath = path.join(module.path, 'plugins')
const BasePlugin = require(path.join(pluginsPath, 'BasePlugin'))
const FunctionAnalysis = require(path.join(pluginsPath, 'FunctionAnalysis'))
const ProviderDataPlugin = require(path.join(pluginsPath, 'ProviderDataPlugin'))
const PluginFactory = require(path.join(pluginsPath, 'PluginFactory'))

module.exports = {
    plugins: {
        BasePlugin,
        FunctionAnalysis,
        ProviderDataPlugin,
        PluginFactory
    },
    UtilsLibrary
}