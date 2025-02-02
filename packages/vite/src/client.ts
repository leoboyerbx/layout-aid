import type { LayoutaidConfig } from '@layoutaid/core'
import { columns } from '@layoutaid/core'

declare const __LAYOUTAID_CONFIG__: LayoutaidConfig

const config: LayoutaidConfig = __LAYOUTAID_CONFIG__

console.log(config)
if (config.columns) {
    columns(config.columns)
}
