# 指令

## 組件包試用

```bash 
#可能會被刪除
npm i svelte-common-lib-terry@0.0.6
# or
pnpm i svelte-common-lib-terry@0.0.6
```

### 目前組件列表
* ### btntest
    測試用組件按鈕
* ### editorcore
    編輯器核心
* ### editorhistory
    編輯器歷史

* ### editorquickfont
    編輯器簡易字體

* ### editortopbar
    編輯器套用選單列樣式

* ### editorfamilyfont
    編輯器字體設定
* ### editoralign 
    編輯氣對齊

## 組件各入口
```ts
// btntest 擇一 
  import { btntest } from 'svelte-common-lib-terry';  // 總引入
  import { btntest } from 'svelte-common-lib-terry/btntest';  //二級入口指定引入

// editorcore 擇一
import { editorcore } from 'svelte-common-lib-terry/editor'; // 編輯器相關總引入
import { editorcore } from 'svelte-common-lib-terry/editor/editoe-core'; // 編輯器核心 二級入口指定引入


//editorhistory  擇一
import { editorhistory} from 'svelte-common-lib-terry/editor' // 編輯器相關總引入
import { editorhistory } from 'svelte-common-lib-terry/editor/editor-exection' // 編輯器插件相關引入


//editorquickfont  擇一
import { editorquickfont} from 'svelte-common-lib-terry/editor' // 編輯器相關總引入
import { editorquickfont } from 'svelte-common-lib-terry/editor/editor-exection' // 編輯器插件相關引入


//editortopbar  擇一
import { editortopbar} from 'svelte-common-lib-terry/editor' // 編輯器相關總引入
import { editortopbar } from 'svelte-common-lib-terry/editor/editor-exection' // 編輯器插件相關引入


//editorfamilyfont  擇一
import { editorfamilyfont} from 'svelte-common-lib-terry/editor' // 編輯器相關總引入
import { editorfamilyfont } from 'svelte-common-lib-terry/editor/editor-exection' // 編輯器插件相關引入


//editoralign  擇一
import { editoralign} from 'svelte-common-lib-terry/editor' // 編輯器相關總引入
import { editoralign } from 'svelte-common-lib-terry/editor/editor-exection' // 編輯器插件相關引入

```


## use on Angular
```json
// angular.json
"options":{
  "styles": [
    "svelte-common-lib-terry/editor/editor-core/index.css",
    "svelte-common-lib-terry/editor/editor-exection/index.css"
  ],
}
```

```html
<div class="topBar"></div>
<div class="editor"></div>
<hr>
<div class="btntest"></div>
{{btntest?.count}}
```

```ts
import { editorcore } from 'svelte-common-lib-terry/editor/editor-core';
import {
  editorhistory,
  editortopbar,
  editorquickfont,
  editorfamilyfont,
  editoralign
} from 'svelte-common-lib-terry/editor/editor-exection';
import { btntest } from 'svelte-common-lib-terry/btntest';
//...

  editorcore: editorcore | undefined;
  btntest: btntest | undefined;

  ngAfterViewInit(): void {


    this.editorcore = new editorcore({
      target: document.querySelector('.editor'),
    })

    let targetAndProps = {
      target: document.querySelector('.topBar'),
      props: {
        editor: this.editorcore.editor
      }
    };

    new editortopbar(
      {
        target: document.querySelector('.topBar'),
        props: {
          target: document.querySelector('.topBar')
        }
      }
    );
    new editorhistory(targetAndProps);
    new editorquickfont(targetAndProps)
    new editorfamilyfont(targetAndProps)
    new editoralign(targetAndProps)

    this.btntest = new btntest({
      target: document.querySelector('.btntest'),
    })
    this.btntest.$on('update', (data: any) => {
      console.log(data,
      this.btntest?.count)
    });

  }
```

## use on Vue
```css
/* main.css */
@import '/node_modules/svelte-common-lib-terry/editor/editor-core/index.css';
@import '/node_modules/svelte-common-lib-terry/editor/editor-exection/index.css';
```

```html
  <div class="topBar"></div>
  <div class="editor"></div>
  <hr />
  <div class="btntest"></div>
  {{ count }}
```

```ts
import { editorcore } from "svelte-common-lib-terry/editor/editor-core";
import {
  editorhistory,
  editortopbar,
  editorquickfont,
  editorfamilyfont,
  editoralign,
} from "svelte-common-lib-terry/editor/editor-exection";
import { btntest } from "svelte-common-lib-terry/btntest";

import { onMounted, ref, type Ref } from "vue";

let veditorcore: editorcore | undefined;
let vbtntest: btntest | undefined;
let count: Ref<number> = ref(0);

onMounted(() => {
  veditorcore = new editorcore({
    target: document.querySelector(".editor"),
  });

  let targetAndProps = {
    target: document.querySelector(".topBar"),
    props: {
      editor: veditorcore.editor,
    },
  };

  new editortopbar({
    target: document.querySelector(".topBar"),
    props: {
      target: document.querySelector(".topBar"),
    },
  });
  new editorhistory(targetAndProps);
  new editorquickfont(targetAndProps);
  new editorfamilyfont(targetAndProps);
  new editoralign(targetAndProps);

  vbtntest = new btntest({
    target: document.querySelector(".btntest"),
  });
  vbtntest.$on("update", (data: any) => {
    console.log(data, vbtntest?.count);
    count.value = vbtntest?.count;
    // or count.value = data["detail"]["count"];
  });
});
```

## 安裝
```bash
pnpm i
```

## 運行測試
內部測試內容寫在```./src/routes/+page.svelte```
```bash
npm run dev
```

## 編譯
使用一次執行 (1) 或者 分步運行 (2)
將產生dist
#### (1)
```bash
npm run build
# 以包含(2)的所有步驟
```

#### (2)
```bash
npm run build-rm-first
# 先刪除舊的編譯資料夾
npm run build-rollup
# 進行Svelte編譯
npm run build-rollup-dts
# 進行 Js 轉 DTS
```

## 發布
使用發布打包 (1) 或者 直接上傳雲 (2)

#### 發布打包
此指令將把package.json複製到dist並壓縮成一個包
```bash
npm run pack
```

#### 直接上傳雲
將package.json複製到dist，移動至dist，並進行上傳
（需處理完npm登入，並確認帳號有上傳權限以及package.json版本及名稱是否有誤）
```bash
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
  svelte 快速建置網頁組合包
* ### svelte-preprocess [here](https://github.com/sveltejs/svelte-preprocess)
  svelte 預處理器 SCSS/TS/...預處理
