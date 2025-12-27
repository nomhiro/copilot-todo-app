# CLAUDE.md - Copilot TODO App

このファイルはClaude Codeがこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

GitHub Copilot認定資格（GH-300）コースのハンズオン用TODOアプリケーションです。
受講者がGitHub Copilotの各機能を実践的に学習できるよう設計されています。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS
- **状態管理**: React hooks (useState, useEffect)
- **データ**: インメモリモックデータ（永続化なし）

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── todos/         # TODO CRUD API
│   │   └── stats/         # 統計API
│   ├── todos/             # TODOページ
│   └── stats/             # 統計ページ
├── components/            # Reactコンポーネント
│   ├── layout/           # レイアウト（Header, Navigation）
│   ├── todos/            # TODO関連コンポーネント
│   └── ui/               # 汎用UIコンポーネント
└── lib/                   # ライブラリ・ユーティリティ
    ├── types/            # TypeScript型定義
    ├── utils/            # ユーティリティ関数
    ├── validators/       # バリデーション
    ├── api/              # APIクライアント
    └── data/             # モックデータ
```

## 仕様書の場所

詳細な仕様は `docs/` ディレクトリを参照してください：

- [docs/SPEC.md](docs/SPEC.md) - 機能仕様書（メイン）
- [docs/API.md](docs/API.md) - API仕様書
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - アーキテクチャ設計書
- [docs/HANDS_ON.md](docs/HANDS_ON.md) - ハンズオンガイド

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# リント
npm run lint

# 型チェック
npx tsc --noEmit
```

## コーディング規約

### ファイル命名
- コンポーネント: PascalCase（例: `TodoCard.tsx`）
- ユーティリティ: camelCase（例: `dateUtils.ts`）
- 型定義: PascalCase（例: `Todo`, `FilterOptions`）

### コンポーネント設計
- 関数コンポーネントを使用
- アロー関数で定義
- `'use client'`は必要な場合のみ使用
- Propsはインターフェースで定義

### 型定義
- 型は`lib/types/index.ts`に集約
- 明示的な型注釈を推奨
- `any`の使用は禁止

## 意図的なバグ（ハンズオン用）

以下のファイルには学習用の意図的なバグが含まれています：

| ID | ファイル | バグ内容 |
|----|----------|---------|
| BUG-001 | `lib/utils/dateUtils.ts` | 月末処理の境界値エラー |
| BUG-002 | `lib/utils/todoUtils.ts` | フィルター条件の論理エラー |
| BUG-003 | `components/todos/TodoList.tsx` | useEffect依存配列の問題 |
| BUG-004 | `lib/api/todoApi.ts` | 非同期エラーハンドリング不備 |
| BUG-005 | `lib/utils/priorityUtils.ts` | Off-by-oneエラー |

**注意**: これらのバグは修正しないでください。ハンズオン演習で使用します。

## GitHub Copilot ハンズオン対応

このプロジェクトは以下のCopilot機能のハンズオンに対応しています：

- **Copilot Chat**: `/explain`, `/tests`, `/fix`, `/doc`
- **コーディングエージェント**: Issue Templates、GitHub Actions
- **コードレビュー**: `.github/copilot-instructions.md`
- **CLI**: `gh copilot explain`, `gh copilot suggest`
- **Spaces**: リポジトリをナレッジベースとして使用
- **コンテンツ除外**: `config/secrets.example.ts`

## 新機能追加時の手順

1. `docs/SPEC.md`に機能仕様を追記
2. 必要に応じて`docs/API.md`にAPIエンドポイントを追記
3. 型定義を`lib/types/index.ts`に追加
4. コンポーネント/ページを実装
5. テストを作成（`__tests__/`）

## 注意事項

- このアプリはデータベースを使用せず、メモリ内でデータを管理
- サーバー再起動時にデータはリセット
- 本番環境へのデプロイは想定していない
- セキュリティ要件は学習目的のため簡略化
