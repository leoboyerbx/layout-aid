import type { LayoutaidConfig } from '@layoutaid/core'
import { createPlugin } from './createPlugin'
import { getPluginClientPath } from './utils'

/**
 * Plugin that adds visual aids for dev.
 *
 * @param config - The configuration for the plugin.
 */
export default createPlugin(
    'layoutaid',
    getPluginClientPath(import.meta.url),
    {
        columns: {}, // use module defaults
    } as Partial<LayoutaidConfig>,
)
