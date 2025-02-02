import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function getPluginClientPath(indexFile: string) {
    return resolve(fileURLToPath(new URL('.', indexFile)), 'client.mjs')
}
