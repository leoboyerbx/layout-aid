import type { LayoutaidConfig } from '@layoutaid/core'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { columns, outline } from '@layoutaid/core'
import './plugin.css'

export default defineNuxtPlugin(async () => {
    const layoutAidConfig = useRuntimeConfig().public.layoutAidConfig as LayoutaidConfig
    if (layoutAidConfig.columns) {
        columns(layoutAidConfig.columns)
    }
    if (layoutAidConfig.outline) {
        outline(layoutAidConfig.outline)
    }
})
