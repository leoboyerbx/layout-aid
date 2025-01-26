import { getPluginBuildConfig } from '@layoutaid/shared'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig(getPluginBuildConfig({
    externals: ['hotkeys-js'],
}))
