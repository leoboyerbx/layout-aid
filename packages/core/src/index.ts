import type { ColumnsConfig } from './lib/columns'
import type { OutlineConfig } from './lib/outline'

export interface LayoutaidConfig {
    /**
     * The configuration for the columns module.
     * Can be set to false to disable it.
     */
    columns: ColumnsConfig | false
    /**
     * The configuration for the outline module.
     * Can be set to false to disable it.
     */
    outline: OutlineConfig | false
}

export * from './lib/columns'
export * from './lib/outline'
