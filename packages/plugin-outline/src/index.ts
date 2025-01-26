import { createPlugin, getPluginClientPath } from '@layoutaid/shared'

/**
 * Plugin that adds visual outlines to every element.
 *
 * @param config.color - The color of the outlines. Defaults to red.
 * @param config.persist - Whether the outlines should persist between page loads. Defaults to true.
 */
export default createPlugin(
    'outline',
    getPluginClientPath(import.meta.url),
    {
        color: 'red',
        persist: true,
    },
)
