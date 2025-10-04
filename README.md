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

## GitHub へのアップロードについて

プロジェクトルートには `.gitignore` を含めており、`node_modules/` や `dist/` といったビルド成果物はコミット対象外になっています。`npm install` 実行後に Git の変更点が大量に出てしまった場合でも、`node_modules/` ディレクトリは自動的に無視されるため、そのままコミットして GitHub にプッシュできます。

もし `node_modules/` がステージング対象に含まれてしまう場合は、`git rm -r --cached node_modules` を実行してからコミットしてください。
