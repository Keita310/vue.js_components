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
![9bd0e81bef6f0df6c116570d8efb0628](https://user-images.githubusercontent.com/30276142/109814164-846fcc00-7c71-11eb-932e-c31052370efe.gif)
<br><br><br>


### HTML対応プレースホルダTEXTAREAコンポーネント
改行等が使えるhtml対応したプレースホルダが使えるtextareaコンポーネント。<br>
slotでプレースホルダの内容を渡す。<br>
<br>
デモ<br>
![23df3e64c77d239d8fb47ab77a7a9a31](https://user-images.githubusercontent.com/30276142/109814187-8b96da00-7c71-11eb-9acb-58a1920ff163.gif)
<br><br><br>



### カスタムHTML5バリデーションINPUTコンポーネント
独自でロジックを追加すれば簡単にHTML5のバリデーションを追加できるinputコンポーネント。<br>
・全角カタカナ<br>
・全角文字数制限<br>
・半角文字数制限<br>
・半角数字<br>
4つのバリデーションを実装している。<br>
<br>
文字数制限を指定した場合、フォームの右端に最大数の案内が表示される。<br>
<br>
デモ<br>
![23f00ea95a59ec45450a58956805f8b8](https://user-images.githubusercontent.com/30276142/109814196-8f2a6100-7c71-11eb-8856-ba1bc9b91026.gif)
