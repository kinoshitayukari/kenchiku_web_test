# 直営リフォーム工房 LP

Netlifyでホスティングできるよう、Vite + React + Tailwind CSSで構築した日本語のランディングページです。

## 必要要件

- Node.js 18 以上
- npm 9 以上

## 開発サーバー

```bash
npm install
npm run dev
```

`http://localhost:5173` をブラウザで開き、ホットリロードされた開発用ページを確認できます。

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力されます。このディレクトリを Netlify の公開ディレクトリに指定してください。

## Netlify 設定

`netlify.toml` には以下の設定を含めています。

- ビルドコマンド: `npm run build`
- 公開ディレクトリ: `dist`
- ローカル開発: `npm run dev`

Netlify にリポジトリを接続するだけで、自動的にビルド・デプロイが行われます。
