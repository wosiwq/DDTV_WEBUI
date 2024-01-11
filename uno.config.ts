import presetAttributify from '@unocss/preset-attributify'
import presetTagify from '@unocss/preset-tagify'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetTagify(), presetAttributify()],
  transformers: [transformerDirectives()]
})
