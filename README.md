# static-web-dev-server
透過 `Jade` 和 `Sass` 協助快速開發靜態網頁

# 安裝

### Node.js 版本

```
Node v7.6.0
```

### 相依性套件

```
npm install
npm install supervisor -g
```

### 指令

##### 啟動開發用伺服器

* 支援 `Jade` 和 `Sass`

```
npm start
```

並開啟 `http://localhost:3000/` 即可看到目錄

##### 編譯成靜態檔案

* `Jade` -> `HTML`
* `Sass` -> `css`
* 編譯至 `/public`
* 上一次編譯備份 `/public.bk`
* 編譯筆記錄黨 `/public/note.md`

```
npm build
```

##### 佈署至 FTP

* 到 `./deploy.js` 中設定 `ip`, `username`
* password 請另外設定再載入

```
npm deploy
```

********

### Demo

##### 1. 撰寫 `Jade`

* 啟動伺服器後，在 `/views` 下方新增新的 `demo.jade` 檔案即可
* 並開啟 `http://localhost:3000/` 可以看到目錄，並在其中選擇 `demo` 的頁面
* 或是直接  `http://localhost:3000/demo` 亦可

##### 2. 撰寫 `Sass`

* 在 `/dist/sass` 的目錄下新增 `demo.sass`
* 在 `.sass` 中撰寫所需要的內容後
* 在 `demo.jade` 的 `head` 中新增 css link

``` jade
link(rel='stylesheet' type='text/css' href='./css/demo.css')
```

每次引用該 `demo.css` 時，會自動將 `demo.sass` 編譯成 `demo.css` 檔案

##### 3. 將 `Demo.jade` 加入到編譯工作列中

* 目的是讓 `Demo.jade` 加入到編譯成靜態網頁工作中
* 修改 `tasks.js` 中的 tasks 陣列

原先陣列

``` js
let tasks = [
    new task('home', 'home', data.home),
];
```

加入 `Demo.jade` 的相關資訊

``` js
let tasks = [
    new task('home', 'home', data.home),
    new task('demo', 'demo', null),
];
```

`new task()` 的第一個參數代表該頁面的名稱，也就是最終建立成靜態 HTML 時會命名為 `demo.html`，第二個參數是代表該頁面使用的 `demo.jade` 這個模板，因此模板是可以重複使用的。如果是模板要加入資料，該資料請到 `/data` 的資料夾中新增，並在此引入，無資料需求則傳入 `null`。


##### 4. 編譯成靜態網頁

```
npm build
```

在 `/public` 資料夾中即可看到 `demo.html` 和 `/dist/css/demo.css` 的靜態網頁檔案。

********