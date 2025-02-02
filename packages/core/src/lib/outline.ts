export interface OutlineConfig {
    /**
     * The color of the outline.
     * @default red
     */
    color?: string
    /**
     * Whether to persist the outline state between page loads.
     * @default true
     */
    persist?: boolean
}

export function outline(config: OutlineConfig) {
    const { color = 'red', persist = true } = config
    const styleToApply = /* css */`.layoutaid-debug-outline *:not(.layoutaid-outline-exclude):not(.layoutaid-outline-exclude *):not(.layoutaid-outline-exclude) { outline: 1px solid ${color}; }`
    const stylesheet = document.createElement('style')
    stylesheet.textContent = styleToApply
    document.head.appendChild(stylesheet)

    if (persist && sessionStorage.getItem('debugOutlineActive') === 'true') {
        document.body.classList.add('layoutaid-debug-outline')
    }
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'o' && (e.ctrlKey || e.shiftKey)) {
            document.body.classList.toggle('layoutaid-debug-outline')
            if (persist) {
                sessionStorage.setItem('debugOutlineActive', document.body.classList.contains('layoutaid-debug-outline').toString())
            }
        }
    })

    const hotKey = navigator.userAgent.includes('Mac OS X') ? '^' : '⇧'
    console.log(
        `%c🛠️ Devtool outlines enabled. Use ${hotKey}+O to toggle outlines.%c`,
        'background: #3A7EDD; color:white; padding: 6px 8px; border-radius: 4px;',
        '',
    )
}
