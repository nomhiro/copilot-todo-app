# アーキテクチャ設計書 - Copilot TODO App

## 1. システム概要

### 1.1 アーキテクチャ図

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Next.js App                         │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │    │
│  │  │   Pages     │  │ Components  │  │    Lib      │  │    │
│  │  │  (App Dir)  │  │   (React)   │  │ (Utils/API) │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │    │
│  │                          │                           │    │
│  │  ┌───────────────────────┴───────────────────────┐  │    │
│  │  │              API Routes                        │  │    │
│  │  │         /api/todos, /api/stats                │  │    │
│  │  └───────────────────────┬───────────────────────┘  │    │
│  │                          │                           │    │
│  │  ┌───────────────────────┴───────────────────────┐  │    │
│  │  │           Mock Data (In-Memory)               │  │    │
│  │  │              lib/data/mockTodos.ts            │  │    │
│  │  └───────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 技術スタック

| レイヤー | 技術 | バージョン |
|----------|------|-----------|
| フレームワーク | Next.js | 14.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 3.x |
| ランタイム | Node.js | 20.x |
| パッケージ管理 | npm | 10.x |

---

## 2. ディレクトリ構造

```
copilot-todo-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── todos/         # /api/todos
│   │   │   │   ├── route.ts   # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts # GET, PUT, DELETE
│   │   │   └── stats/
│   │   │       └── route.ts   # GET
│   │   ├── todos/             # TODOページ
│   │   │   ├── new/
│   │   │   │   └── page.tsx   # 作成ページ
│   │   │   └── [id]/
│   │   │       ├── page.tsx   # 詳細ページ
│   │   │       └── edit/
│   │   │           └── page.tsx # 編集ページ
│   │   ├── stats/
│   │   │   └── page.tsx       # 統計ページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホーム（一覧）
│   │   └── globals.css        # グローバルスタイル
│   │
│   ├── components/            # Reactコンポーネント
│   │   ├── layout/           # レイアウト系
│   │   │   ├── Header.tsx    # ヘッダー
│   │   │   └── Navigation.tsx # ナビゲーション
│   │   ├── todos/            # TODO関連
│   │   │   ├── TodoList.tsx  # 一覧コンポーネント
│   │   │   ├── TodoCard.tsx  # カードコンポーネント
│   │   │   ├── TodoForm.tsx  # フォームコンポーネント
│   │   │   ├── TodoFilter.tsx # フィルターコンポーネント
│   │   │   └── TodoSearch.tsx # 検索コンポーネント
│   │   └── ui/               # 汎用UI
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   │
│   └── lib/                   # ライブラリ
│       ├── types/            # 型定義
│       │   └── index.ts
│       ├── utils/            # ユーティリティ
│       │   ├── dateUtils.ts
│       │   ├── todoUtils.ts
│       │   ├── sortUtils.ts
│       │   ├── filterUtils.ts
│       │   ├── statsUtils.ts
│       │   └── priorityUtils.ts
│       ├── validators/       # バリデーション
│       │   └── todoValidator.ts
│       ├── api/              # APIクライアント
│       │   └── todoApi.ts
│       └── data/             # データ
│           └── mockTodos.ts
│
├── docs/                      # ドキュメント
│   ├── SPEC.md               # 機能仕様書
│   ├── API.md                # API仕様書
│   ├── ARCHITECTURE.md       # 本ドキュメント
│   └── HANDS_ON.md           # ハンズオンガイド
│
├── __tests__/                 # テスト
│   └── README.md
│
├── config/                    # 設定
│   └── secrets.example.ts    # シークレット例
│
├── .github/                   # GitHub設定
│   ├── copilot-instructions.md
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│
├── CLAUDE.md                  # Claude Code設定
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 3. コンポーネント設計

### 3.1 コンポーネント階層

```
RootLayout
└── Header
    └── Navigation
└── Page Content
    ├── HomePage (/)
    │   └── TodoList
    │       ├── TodoSearch
    │       ├── TodoFilter
    │       └── TodoCard[]
    │
    ├── NewTodoPage (/todos/new)
    │   └── TodoForm
    │
    ├── TodoDetailPage (/todos/[id])
    │
    ├── EditTodoPage (/todos/[id]/edit)
    │   └── TodoForm
    │
    └── StatsPage (/stats)
        ├── StatCard[]
        └── PriorityBar[]
```

### 3.2 コンポーネント責務

| コンポーネント | 種類 | 責務 |
|---------------|------|------|
| Header | Server | ロゴとナビゲーションの表示 |
| Navigation | Client | ルーティングとアクティブ状態管理 |
| TodoList | Client | TODO一覧の取得・表示・状態管理 |
| TodoCard | Client | 個別TODOの表示・操作 |
| TodoForm | Client | TODO作成/編集フォーム |
| TodoFilter | Client | フィルター選択UI |
| TodoSearch | Client | 検索入力UI |
| Button | Client | 汎用ボタン |
| Input | Client | 汎用入力フィールド |
| Modal | Client | モーダルダイアログ |

### 3.3 Server Components vs Client Components

**Server Components**（`'use client'`なし）:
- Header
- ページコンポーネント（page.tsx）

**Client Components**（`'use client'`あり）:
- Navigation（usePathname使用）
- TodoList（useState, useEffect使用）
- TodoCard（イベントハンドラ使用）
- TodoForm（フォーム状態管理）
- TodoFilter, TodoSearch
- Button, Input, Modal

---

## 4. データフロー

### 4.1 状態管理

```
┌─────────────────────────────────────────────────────────────┐
│                     TodoList Component                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  State:                                              │    │
│  │  - todos: Todo[]                                     │    │
│  │  - loading: boolean                                  │    │
│  │  - error: string | null                              │    │
│  │  - filters: FilterOptions                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Effects:                                            │    │
│  │  - useEffect → fetchTodos(filters)                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  API Calls:                                          │    │
│  │  - todoApi.fetchTodos()                             │    │
│  │  - todoApi.toggleTodoComplete()                     │    │
│  │  - todoApi.deleteTodo()                             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 データの流れ（作成時）

```
User Input → TodoForm → validate() → createTodo() → API POST
                                                         │
                                                         ▼
                                                   Mock Data
                                                         │
                                                         ▼
                                                   Response
                                                         │
                                                         ▼
                                              Router.push('/')
                                                         │
                                                         ▼
                                              TodoList refresh
```

---

## 5. API設計

### 5.1 ルーティング

| ファイル | エンドポイント | メソッド |
|---------|---------------|---------|
| `api/todos/route.ts` | `/api/todos` | GET, POST |
| `api/todos/[id]/route.ts` | `/api/todos/:id` | GET, PUT, DELETE |
| `api/stats/route.ts` | `/api/stats` | GET |

### 5.2 レスポンス形式

すべてのAPIはJSON形式でレスポンスを返します。

**成功時**:
```json
{ "data": "..." }
// または配列/オブジェクト直接
```

**エラー時**:
```json
{
  "error": "エラーメッセージ",
  "details": ["詳細1", "詳細2"]
}
```

---

## 6. ユーティリティ設計

### 6.1 モジュール責務

| モジュール | 責務 |
|-----------|------|
| dateUtils | 日付の計算・フォーマット |
| todoUtils | TODOのフィルタリング・ソート |
| sortUtils | ソート処理（複数条件対応） |
| filterUtils | フィルター処理 |
| statsUtils | 統計計算 |
| priorityUtils | 優先度関連の処理 |
| todoValidator | 入力バリデーション |
| todoApi | APIクライアント |

### 6.2 依存関係

```
todoApi
    └── types
todoUtils
    └── types
sortUtils
    └── types
filterUtils
    └── types
statsUtils
    ├── types
    └── dateUtils
priorityUtils
    └── types
todoValidator
    └── types
dateUtils
    └── (なし)
```

---

## 7. エラーハンドリング

### 7.1 エラー種別

| 種別 | 発生箇所 | 対処 |
|------|---------|------|
| バリデーションエラー | TodoForm | フォーム上部にエラー表示 |
| APIエラー | todoApi | コンポーネントのerror stateに設定 |
| 404エラー | ページ | notFound()呼び出し |
| ネットワークエラー | fetch | エラーメッセージ + 再試行ボタン |

### 7.2 エラー表示パターン

```tsx
// コンポーネント内
if (error) {
  return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
      {error}
      <button onClick={loadTodos}>再試行</button>
    </div>
  );
}
```

---

## 8. セキュリティ考慮事項

### 8.1 現在の実装（学習用）

- 認証/認可: なし
- CSRF対策: なし
- 入力サニタイゼーション: 基本的なもののみ

### 8.2 本番環境で必要な対策

- [ ] 認証システム（NextAuth.js等）
- [ ] CSRF トークン
- [ ] Rate Limiting
- [ ] 入力値の厳密なバリデーション
- [ ] XSS対策
- [ ] SQLインジェクション対策（DB使用時）

---

## 9. パフォーマンス考慮事項

### 9.1 現在の最適化

- Server Componentsの活用
- 画像最適化（next/image）
- フォント最適化（next/font）

### 9.2 将来の最適化候補

- [ ] データのキャッシング（SWR/React Query）
- [ ] 仮想スクロール（大量データ時）
- [ ] コンポーネントのメモ化
- [ ] ページネーション

---

## 10. テスト戦略

### 10.1 テスト種別

| 種別 | 対象 | ツール |
|------|------|-------|
| ユニットテスト | utils, validators | Jest |
| コンポーネントテスト | components | React Testing Library |
| E2Eテスト | 全体フロー | Playwright（将来） |

### 10.2 テストファイル配置

```
__tests__/
├── lib/
│   ├── utils/
│   │   ├── dateUtils.test.ts
│   │   ├── todoUtils.test.ts
│   │   └── ...
│   └── validators/
│       └── todoValidator.test.ts
└── components/
    └── todos/
        ├── TodoCard.test.tsx
        └── ...
```

---

## 11. デプロイ考慮事項

### 11.1 現在の構成

- ローカル開発環境のみ
- `npm run dev`で起動

### 11.2 本番デプロイ（将来）

推奨プラットフォーム:
- Vercel（Next.js最適化）
- AWS Amplify
- Netlify

必要な設定:
- 環境変数の設定
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `.next`
