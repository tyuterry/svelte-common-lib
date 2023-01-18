# 指令

## 安裝
```
pnpm i
```

## 運行測試
```
npm run dev
```

## 編譯
使用一次執行 (1) 或者 分步運行 (2)
#### (1)
```
npm run build
//以包含(2)的所有步驟
```

#### (2)
```
npm run build-rm-first
// 先刪除舊的編譯資料夾
npm run build-rollup
// 進行Svelte編譯
npm run build-rollup-dts
// 進行 Js 轉 DTS
```

## 發布
使用發布打包 (1) 或者 直接上傳雲 (2)

#### 發布打包
此指令將把package.json複製到dist並壓縮成一個包
```
npm run pack
```

#### 直接上傳雲
將package.json複製到dist，移動至dist，並進行上傳
（需處理完npm登入，並確認帳號有上傳權限以及package.json版本及名稱是否有誤）
```
cp ./package.json ./dist/package.json
cd dist
npm publish
```


# Package 打包相關
* ### Rollup [here](https://rollupjs.org/guide/en/)
  打包器

* ### rollup-plugin-svelte [here](https://github.com/sveltejs/rollup-plugin-svelte)
  rollup svelte 插件 

* ### (with svelte.compile) [here](https://svelte.dev/docs#compile-time-svelte-compile)
  插件調用svelte.compile()相關設定

* ### svelte-preprocess [here](https://github.com/sveltejs/svelte-preprocess)
  svelte 預處理器 SCSS/TS/...預處理

* ### Rollup resolve [here](https://github.com/rollup/plugins/tree/master/packages/node-resolve/#readme)
  第三方套件解析器
* ### Rollup dts [here](https://github.com/Swatinem/rollup-plugin-dts#readmes)
  JS 轉 DTS
* ### Rollup SCSS [here](https://github.com/thgh/rollup-plugin-scss)
  Rollip SCSS 預處理
* ### Rollup TypeSctipt [here](https://github.com/rollup/plugins/tree/master/packages/typescript/#readme)
  Rollip TypeScript 預處理

# 測試相關
* ### Vite [here](https://vitejs.dev/)
  前端環境工具 
* ### SvelteKit  [here](https://kit.svelte.dev/docs/introduction)
  svelte 快速建置網頁解決方案
* ### svelte-preprocess [here](https://github.com/sveltejs/svelte-preprocess)
  svelte 預處理器 SCSS/TS/...預處理
