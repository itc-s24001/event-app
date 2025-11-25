# イベント管理アプリ

Next.js と microCMS を使用したイベント一覧・詳細表示アプリケーションです。

## 📋 機能

- イベント一覧表示（ページネーション対応）
- イベント検索機能
- イベント詳細ページ
- レスポンシブデザイン

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14.1.4 (App Router)
- **言語**: TypeScript
- **CMS**: microCMS
- **スタイリング**: CSS Modules

## 📁 プロジェクト構造

```
event-app/
├── app/
│   ├── components/
│   │   ├── Pagination.tsx      # ページネーションコンポーネント
│   │   └── SearchBar.tsx       # 検索バーコンポーネント
│   ├── events/
│   │   └── [id]/
│   │       ├── page.tsx        # イベント詳細ページ
│   │       └── page.module.css
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                # トップページ（イベント一覧）
│   └── page.module.css
├── libs/
│   └── microcms.ts             # microCMS クライアント設定
├── public/
├── .env.local                  # 環境変数（要作成）
├── next.config.mjs
├── package.json
└── tsconfig.json
```

### イベント一覧ページ (`app/page.tsx`)

- microCMS からイベントデータを取得
- 1 ページあたり 4 件表示
- キーワード検索機能
- ページネーション

### イベント詳細ページ (`app/events/[id]/page.tsx`)

- 個別イベントの詳細情報を表示
- 日時、場所、説明、画像を表示
- 一覧ページへの戻るリンク

### 検索機能 (`app/components/SearchBar.tsx`)

- リアルタイム検索
- URL クエリパラメータと連動
- 検索時は自動的に 1 ページ目に戻る

### ページネーション (`app/components/Pagination.tsx`)

- ページ番号ボタンで簡単に移動
- 現在のページをハイライト表示
- 検索条件を保持したまま移動可能
