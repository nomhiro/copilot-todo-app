# ハンズオンガイド - Copilot TODO App

このガイドはGitHub Copilot認定資格（GH-300）コースのハンズオン演習で使用するTODOアプリケーションの操作方法を説明します。

---

## 目次

1. [環境構築](#1-環境構築)
2. [アプリケーション起動](#2-アプリケーション起動)
3. [基本操作](#3-基本操作)
4. [ハンズオン演習一覧](#4-ハンズオン演習一覧)
5. [トラブルシューティング](#5-トラブルシューティング)

---

## 1. 環境構築

### 1.1 前提条件

- Node.js 20.x 以上
- npm 10.x 以上
- Git
- Visual Studio Code（推奨）
- GitHub Copilot拡張機能

### 1.2 リポジトリのクローン

```bash
git clone https://github.com/nomhiro/copilot-todo-app.git
cd copilot-todo-app
```

### 1.3 依存関係のインストール

```bash
npm install
```

---

## 2. アプリケーション起動

### 2.1 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスしてください。

### 2.2 ビルドと確認

```bash
npm run build
npm run start
```

---

## 3. 基本操作

### 3.1 TODO一覧（ホーム）

- URL: `/`
- TODO一覧を表示
- フィルター・検索機能で絞り込み
- チェックボックスで完了状態を切り替え

### 3.2 TODO作成

- URL: `/todos/new`
- 「新規TODO」ボタンまたはナビゲーションからアクセス
- 必須項目: タイトル、優先度
- 任意項目: 説明、期限

### 3.3 TODO詳細

- URL: `/todos/[id]`
- 一覧からTODOカードをクリック
- 詳細情報の確認と編集・削除へのアクセス

### 3.4 TODO編集

- URL: `/todos/[id]/edit`
- 詳細ページから「編集」ボタンでアクセス
- すべての項目を編集可能

### 3.5 統計ダッシュボード

- URL: `/stats`
- 完了率、生産性スコア、優先度別タスク数を表示

---

## 4. ハンズオン演習一覧

### Section 4: GitHub Copilotでコード補完を試す

**演習内容**: Copilotのコード補完機能を体験

**対象ファイル**:
- `src/lib/utils/statsUtils.ts`

**手順**:
1. ファイルを開く
2. 新しい関数のコメントを記述
3. Copilotの補完候補を確認

**例**:
```typescript
// 平均完了時間を計算する関数
```

---

### Section 5: Copilot Chatでコード生成

**演習内容**: チャットを使ってコードを生成

**対象ファイル**:
- `src/components/ui/` 配下

**手順**:
1. Copilot Chatを開く
2. 新しいコンポーネントの生成を依頼

**プロンプト例**:
```
Confirm ダイアログコンポーネントを作成してください。
プロパティ: isOpen, onConfirm, onCancel, title, message
```

---

### Section 6: コーディングエージェント

**演習内容**: Issue から自動でPRを作成

**対象**:
- `.github/ISSUE_TEMPLATE/`
- GitHub Issueページ

**手順**:
1. Issueを作成（Feature Requestテンプレートを使用）
2. Copilotに「このIssueを解決するPRを作成して」と依頼
3. 生成されたPRを確認

---

### Section 7: コードレビュー

**演習内容**: PRに対するCopilotのコードレビュー

**対象**:
- `.github/copilot-instructions.md`
- プルリクエスト

**手順**:
1. 新しいブランチを作成
2. コードを変更してPRを作成
3. CopilotのレビューコメントI確認

---

### Section 8: Copilot CLI

**演習内容**: コマンドラインでCopilotを活用

**コマンド例**:
```bash
# コマンドの説明を得る
gh copilot explain "git rebase -i HEAD~3"

# コマンドを提案してもらう
gh copilot suggest "未コミットの変更を一時退避する"
```

---

### Section 9: Copilot Extensions

**演習内容**: 拡張機能の活用

**手順**:
1. GitHub Marketplaceで拡張機能を確認
2. Copilot Chatで拡張機能を呼び出し

**例**:
```
@docker Dockerfileを最適化してください
```

---

### Section 11: Copilot Spaces

**演習内容**: リポジトリをナレッジベースとして活用

**手順**:
1. Copilot Spacesでこのリポジトリを追加
2. リポジトリに関する質問を投げかける

**質問例**:
- 「このプロジェクトのアーキテクチャを説明して」
- 「TODO作成のバリデーションルールは？」

---

### Section 12: デバッグ・テスト・ドキュメント生成

#### 12.1 バグ修正演習

**演習内容**: 意図的に埋め込まれたバグをCopilotで発見・修正

| バグID | ファイル | ヒント |
|--------|----------|--------|
| BUG-001 | `lib/utils/dateUtils.ts` | 月末の日付計算 |
| BUG-002 | `lib/utils/todoUtils.ts` | フィルター条件 |
| BUG-003 | `components/todos/TodoList.tsx` | useEffect依存配列 |
| BUG-004 | `lib/api/todoApi.ts` | エラーハンドリング |
| BUG-005 | `lib/utils/priorityUtils.ts` | 配列インデックス |

**手順**:
1. 対象ファイルを開く
2. Copilot Chatで `/fix` コマンドを実行
3. 提案された修正を確認

#### 12.2 テスト生成演習

**演習内容**: Copilotでユニットテストを生成

**対象ファイル**:
- `src/lib/utils/dateUtils.ts`
- `src/lib/validators/todoValidator.ts`

**手順**:
1. テスト対象ファイルを選択
2. Copilot Chatで `/tests` コマンドを実行
3. `__tests__/` ディレクトリにテストを配置

#### 12.3 ドキュメント生成演習

**演習内容**: JSDocやREADMEを自動生成

**対象ファイル**:
- `src/lib/types/index.ts`（JSDocなし）
- `src/lib/utils/` 配下

**手順**:
1. ドキュメント化したいコードを選択
2. Copilot Chatで `/doc` コマンドを実行
3. 生成されたドキュメントを確認

---

### Section 13: Copilot for Azure

**演習内容**: Azure関連の開発支援

**サンプルプロンプト**:
```
@azure このTODOアプリをAzure App Serviceにデプロイする手順を教えて
```

---

### Section 14: コンテンツ除外

**演習内容**: 機密情報をCopilotから除外

**対象ファイル**:
- `config/secrets.example.ts`

**手順**:
1. `.github/copilot-instructions.md` を確認
2. 除外設定を追加
3. 除外されたファイルでCopilotが機能しないことを確認

---

## 5. トラブルシューティング

### 5.1 開発サーバーが起動しない

```bash
# node_modulesを削除して再インストール
rm -rf node_modules
npm install
npm run dev
```

### 5.2 型エラーが発生する

```bash
# 型チェックを実行
npx tsc --noEmit

# 問題のある箇所を特定
```

### 5.3 APIエラーが発生する

1. ブラウザの開発者ツールでNetworkタブを確認
2. APIレスポンスのエラーメッセージを確認
3. サーバーコンソールでエラーログを確認

### 5.4 データがリセットされる

- このアプリはインメモリデータを使用
- サーバー再起動時にデータはリセット
- これは仕様です（学習用途のため）

### 5.5 Copilotが応答しない

1. GitHub Copilot拡張機能が有効か確認
2. ライセンスが有効か確認
3. VSCodeを再起動

---

## 付録: ファイル構成早見表

```
src/
├── app/
│   ├── api/
│   │   ├── todos/route.ts      # TODO一覧・作成API
│   │   ├── todos/[id]/route.ts # TODO詳細・更新・削除API
│   │   └── stats/route.ts      # 統計API
│   ├── todos/
│   │   ├── new/page.tsx        # 新規作成ページ
│   │   └── [id]/
│   │       ├── page.tsx        # 詳細ページ
│   │       └── edit/page.tsx   # 編集ページ
│   ├── stats/page.tsx          # 統計ページ
│   └── page.tsx                # ホーム（一覧）
├── components/
│   ├── todos/
│   │   ├── TodoList.tsx        # 一覧コンポーネント（BUG-003）
│   │   ├── TodoCard.tsx        # カードコンポーネント
│   │   ├── TodoForm.tsx        # フォームコンポーネント
│   │   ├── TodoFilter.tsx      # フィルター
│   │   └── TodoSearch.tsx      # 検索
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
└── lib/
    ├── types/index.ts          # 型定義（ドキュメント演習用）
    ├── utils/
    │   ├── dateUtils.ts        # 日付ユーティリティ（BUG-001）
    │   ├── todoUtils.ts        # TODOユーティリティ（BUG-002）
    │   ├── priorityUtils.ts    # 優先度ユーティリティ（BUG-005）
    │   └── statsUtils.ts       # 統計ユーティリティ
    ├── validators/
    │   └── todoValidator.ts    # バリデーション
    ├── api/
    │   └── todoApi.ts          # APIクライアント（BUG-004）
    └── data/
        └── mockTodos.ts        # モックデータ
```

---

## 次のステップ

1. 各セクションのハンズオンを順番に実施
2. 疑問点はCopilot Chatに質問
3. 学習内容をメモして復習

Happy Coding with GitHub Copilot!
