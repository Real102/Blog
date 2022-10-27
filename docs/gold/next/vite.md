# vite

## 环境变量访问

vite.config.js 配置文件下访问环境变量，可以借助 Vite 导出的 loadEnv 函数来加载指定的 .env 文件

```ts
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    // vite 配置
  }
})
```

<https://cn.vitejs.dev/config/#environment-variables>
