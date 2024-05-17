import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import { __dirname } from './utils.mjs'

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  ...compat.extends('standard')
]
