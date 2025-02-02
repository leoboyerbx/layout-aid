import type { LayoutaidConfig } from '@layoutaid/core'
import { columns, outline } from '@layoutaid/core'

declare const __LAYOUTAID_CONFIG__: LayoutaidConfig

const config: LayoutaidConfig = __LAYOUTAID_CONFIG__

if (config.columns) {
    columns(config.columns)
}
if (config.outline) {
    outline(config.outline)
}
