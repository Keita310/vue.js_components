## 環境構築

```
// package.jsonの生成
npm init -y
// webpackの設定ファイルを作る
touch webpack.config.js
// webpackの導入
npm install --save-dev webpack webpack-cli
// メインのjsを生成(空)
mkdir src
touch src/index.js
// webpack実行(distディレクトが生成されコンパイル済みのjsが生成される)
npx webpack
// vue.jsのインストール
npm install vue
// .vueファイルを読み込めるようにする
npm install --save-dev vue-loader vue-template-compiler
// .vueファイル上でcss、scssが読み込めるようにする
npm install --save-dev vue-style-loader css-loader style-loader sass-loader node-sass


// ビルド
npx webpack --mode development
```

## コンポーネント

### くり返しコンポーネント
追加、削除、並び替え機能を簡単に実装できるコンポーネント。<br>
slotで繰り返す内容(input等)を渡し、リアクティブにデータの変更が可能。<br>
<br>
デモ<br>
https://gyazo.com/23f00ea95a59ec45450a58956805f8b8

### HTML対応プレースホルダTEXTAREAコンポーネント
改行等が使えるhtml対応したプレースホルダが使えるtextareaコンポーネント。<br>
slotでプレースホルダの内容を渡す。<br>
<br>
デモ<br>
https://gyazo.com/9bd0e81bef6f0df6c116570d8efb0628
