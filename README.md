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

## お問い合わせメール送信の設定

Netlify Functions を利用して、フォーム送信内容を `banakira0326@gmail.com` 宛にメール送信します。
メールを送るために、以下の SMTP 情報を Netlify などの環境変数に設定してください。

| 変数名 | 説明 |
| --- | --- |
| `SMTP_HOST` | SMTP サーバーのホスト名 |
| `SMTP_PORT` | SMTP サーバーのポート番号 (例: 465, 587) |
| `SMTP_USER` | SMTP 認証で使用するユーザー名 |
| `SMTP_PASS` | SMTP 認証で使用するパスワード |
| `SMTP_SECURE` | `true` (既定) か `false` を設定。STARTTLS を使う場合は `false` |
| `SMTP_FROM` | 送信元メールアドレス。未設定の場合は `SMTP_USER` が使用されます |

ローカル開発で Functions を動作確認する場合は、`netlify dev` を使用するか、`.env` に上記の変数を設定した上で `npm run dev` を実行してください。

送信メールには、フォームに入力されたメールアドレスが `replyTo` として設定されるため、返信操作で直接問い合わせ者に回答できます。

## GitHub へのアップロードについて

プロジェクトルートには `.gitignore` を含めており、`node_modules/` や `dist/` といったビルド成果物はコミット対象外になっています。`npm install` 実行後に Git の変更点が大量に出てしまった場合でも、`node_modules/` ディレクトリは自動的に無視されるため、そのままコミットして GitHub にプッシュできます。

もし `node_modules/` がステージング対象に含まれてしまう場合は、`git rm -r --cached node_modules` を実行してからコミットしてください。
