import type { ColumnsConfig } from './lib/columns'

export interface LayoutaidConfig {
    /**
     * The configuration for the columns module.
     * Can be set to false to disable it.
     */
    columns: ColumnsConfig | false
}

export * from './lib/columns'
