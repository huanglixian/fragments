export function getTemplateIdSuffix(id: string) {
  const baseId = `gdy-${id}`
  return `${baseId}-dev`
}

export function getTemplateId(id: string) {
  return id.replace(/^gdy-/, '').replace(/-dev$/, '')
}

const templates = {
  'code-interpreter-v1': {
    name: 'Python 数据分析',
    lib: [
      'python',
      'jupyter',
      'numpy',
      'pandas',
      'matplotlib',
      'seaborn',
      'plotly',
    ],
    file: 'script.py',
    instructions:
      '以 Jupyter Notebook 单元方式运行代码，偏重数据分析，可用较复杂可视化来解释结果。',
    port: null,
  },
  [getTemplateIdSuffix('nextjs-developer')]: {
    name: 'Next.js 开发',
    lib: [
      'nextjs@14.2.5',
      'typescript',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'postcss',
      'tailwindcss',
      'shadcn',
    ],
    file: 'pages/index.tsx',
    instructions:
      '一个可自动热重载的 Next.js 13+ 应用，使用 pages 路由。',
    port: 3000,
  },
  [getTemplateIdSuffix('vue-developer')]: {
    name: 'Vue 前端原型',
    lib: ['vue@latest', 'nuxt@3.13.0', 'tailwindcss'],
    file: 'app/app.vue',
    instructions:
      '需要 Vue.js 3+ 构建应用，应用可自动热重载。只输出【单文件 app/app.vue】不要使用 Nuxt、SSR 或多文件。代码尽量合理、简洁，代码行数不宜过多。',
    port: 3000,
  },
  [getTemplateIdSuffix('streamlit-developer')]: {
    name: 'Python 程序',
    lib: [
      'streamlit',
      'pandas',
      'numpy',
      'matplotlib',
      'requests',
      'seaborn',
      'plotly',
    ],
    file: 'app.py',
    instructions: '使用python的Streamlit框架构建应用。构建的时候，代码实用、精简。',
    port: 8501,
  },
  [getTemplateIdSuffix('gradio-developer')]: {
    name: 'Gradio 开发',
    lib: [
      'gradio',
      'pandas',
      'numpy',
      'matplotlib',
      'requests',
      'seaborn',
      'plotly',
    ],
    file: 'app.py',
    instructions:
      '一个 Gradio 应用，Gradio Blocks/Interface 命名为 demo。',
    port: 7860,
  },
}

export type Templates = typeof templates
export default templates

export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates)
    .map(
      ([id, t], index) =>
        `${index + 1}. ${id}: "${t.instructions}". 文件: ${t.file || '无'}. 已安装依赖: ${t.lib.join(', ')}. 端口: ${t.port || '无'}.`,
    )
    .join('\n')}`
}
