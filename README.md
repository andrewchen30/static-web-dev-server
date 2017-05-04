# static-web-dev-server
A quick develop server for static web pages


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