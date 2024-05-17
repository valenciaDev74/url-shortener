import path from 'path'
import { fileURLToPath } from 'url'

// mimic CommonJS variables -- not needed if using CommonJS
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
