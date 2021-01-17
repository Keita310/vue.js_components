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
