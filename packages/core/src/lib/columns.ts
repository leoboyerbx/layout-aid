export interface ColumnsConfig {
    /**
     * The number of columns to create.
     * @default 14
     */
    count?: number
    /**
     * The color of the columns.
     * @default a light blue 0.6 opacity
     */
    color?: string
    /**
     * Whether to persist the columns state between page loads.
     * @default true
     */
    persist?: boolean
}

export function columns(config: ColumnsConfig): void {
    const { count = 14, color = 'rgba(85, 189, 234, 0.6)', persist = false } = config
    const styleToApply = /* css */`.layoutaid-columns {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        z-index: 10000;
        pointer-events: none;
        display: grid;
        grid-template-columns: repeat(${count}, minmax(0, 1fr));
        visibility: hidden;
        outline: none!important;
    }
    .layoutaid-columns * {
        outline: none!important;
    }
    .layoutaid-columns.active {
        visibility: visible;
    }
    .layoutaid-columns div {
        width: 100%;
        border-left: solid 1px ${color};
        color: ${color};
        outline: none;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 16px;
        padding-bottom: 16px;
        justify-content: space-between;
        outline: none!important;
    }
    .layoutaid-columns div:first-child {
        border-left: none;
    }
    .layoutaid-columns div:last-child {
        border-right: none;
    }`

    const stylesheet = document.createElement('style')
    stylesheet.textContent = styleToApply
    document.head.appendChild(stylesheet)

    const debugCols = document.createElement('div')
    debugCols.classList.add('layoutaid-columns')

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div')
        el.innerHTML = `<span>${i + 1}</span><span>${i + 1}</span>`
        debugCols.appendChild(el)
    }
    document.body.appendChild(debugCols)

    // Persist debug cols active to sessionstorage
    if (persist && sessionStorage.getItem('debugColsActive') === 'true') {
        debugCols.classList.add('active')
    }
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'g' && (e.ctrlKey || e.shiftKey)) {
            debugCols.classList.toggle('active')
            sessionStorage.setItem('debugColsActive', debugCols.classList.contains('active').toString())
        }
    })

    const hotKey = navigator.userAgent.includes('Mac OS X') ? '^' : '⇧'
    console.log(
        `%c🛠️ Vite layout aid columns enabled. Use ${hotKey}+g for grid.%c`,
        'background: #22b34b; color:white; padding: 6px 8px; border-radius: 4px;',
        '',
    )
}
