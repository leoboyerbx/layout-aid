import { createPlugin, getPluginClientPath } from '@layoutaid/shared'

/**
 * Plugin that adds visual aids for colums.
 *
 * @param config - The configuration for the plugin.
 * @param config.count - The number of columns to create. Defaults to 14.
 * @param config.color - The color of the columns. Defaults to a light blue 0.6 opacity.
 * @param config.persist - Whether the columns should persist between page loads. Defaults to true.
 */
export default createPlugin(
    'columns',
    getPluginClientPath(import.meta.url),
    {
        count: 14,
        color: 'rgba(85, 189, 234, 0.6)',
        persist: true,
    },
)
