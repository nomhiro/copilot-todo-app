# API仕様書 - Copilot TODO App

## 概要

このドキュメントはTODOアプリのREST API仕様を定義します。

**ベースURL**: `/api`
**コンテンツタイプ**: `application/json`

---

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/todos` | TODO一覧取得 |
| POST | `/api/todos` | TODO作成 |
| GET | `/api/todos/:id` | TODO詳細取得 |
| PUT | `/api/todos/:id` | TODO更新 |
| DELETE | `/api/todos/:id` | TODO削除 |
| GET | `/api/stats` | 統計情報取得 |

---

## 1. TODO一覧取得

### リクエスト

```
GET /api/todos
```

**クエリパラメータ**:

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| priority | string | No | 優先度フィルター（high/medium/low） |
| completed | boolean | No | 完了状態フィルター（true/false） |
| search | string | No | 検索キーワード |

**例**:
```
GET /api/todos?priority=high&completed=false
GET /api/todos?search=プロジェクト
```

### レスポンス

**成功 (200 OK)**:
```json
[
  {
    "id": "1",
    "title": "プロジェクトの初期設定",
    "description": "Next.jsプロジェクトをセットアップ",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-12-25",
    "createdAt": "2024-12-20T10:00:00Z",
    "updatedAt": "2024-12-20T10:00:00Z"
  }
]
```

---

## 2. TODO作成

### リクエスト

```
POST /api/todos
Content-Type: application/json
```

**リクエストボディ**:

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| title | string | Yes | タイトル（2-100文字） |
| description | string | No | 説明（最大500文字） |
| priority | string | No | 優先度（デフォルト: medium） |
| dueDate | string | No | 期限（YYYY-MM-DD形式） |

**例**:
```json
{
  "title": "新しいタスク",
  "description": "タスクの詳細説明",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

### レスポンス

**成功 (201 Created)**:
```json
{
  "id": "1703123456789",
  "title": "新しいタスク",
  "description": "タスクの詳細説明",
  "completed": false,
  "priority": "high",
  "dueDate": "2024-12-31",
  "createdAt": "2024-12-21T10:00:00Z",
  "updatedAt": "2024-12-21T10:00:00Z"
}
```

**バリデーションエラー (400 Bad Request)**:
```json
{
  "error": "Validation failed",
  "details": [
    "Title is required",
    "Title must be 100 characters or less"
  ]
}
```

---

## 3. TODO詳細取得

### リクエスト

```
GET /api/todos/:id
```

**パスパラメータ**:

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| id | string | TODOのID |

### レスポンス

**成功 (200 OK)**:
```json
{
  "id": "1",
  "title": "プロジェクトの初期設定",
  "description": "Next.jsプロジェクトをセットアップ",
  "completed": false,
  "priority": "high",
  "dueDate": "2024-12-25",
  "createdAt": "2024-12-20T10:00:00Z",
  "updatedAt": "2024-12-20T10:00:00Z"
}
```

**見つからない (404 Not Found)**:
```json
{
  "error": "Todo not found"
}
```

---

## 4. TODO更新

### リクエスト

```
PUT /api/todos/:id
Content-Type: application/json
```

**パスパラメータ**:

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| id | string | TODOのID |

**リクエストボディ**:

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| title | string | No | タイトル |
| description | string | No | 説明 |
| completed | boolean | No | 完了状態 |
| priority | string | No | 優先度 |
| dueDate | string | No | 期限 |

**例（完了状態の切り替え）**:
```json
{
  "completed": true
}
```

**例（タイトルと優先度の更新）**:
```json
{
  "title": "更新されたタイトル",
  "priority": "low"
}
```

### レスポンス

**成功 (200 OK)**:
```json
{
  "id": "1",
  "title": "更新されたタイトル",
  "description": "Next.jsプロジェクトをセットアップ",
  "completed": false,
  "priority": "low",
  "dueDate": "2024-12-25",
  "createdAt": "2024-12-20T10:00:00Z",
  "updatedAt": "2024-12-21T15:30:00Z"
}
```

**見つからない (404 Not Found)**:
```json
{
  "error": "Todo not found"
}
```

**バリデーションエラー (400 Bad Request)**:
```json
{
  "error": "Validation failed",
  "details": ["Title must be 100 characters or less"]
}
```

---

## 5. TODO削除

### リクエスト

```
DELETE /api/todos/:id
```

**パスパラメータ**:

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| id | string | TODOのID |

### レスポンス

**成功 (200 OK)**:
```json
{
  "message": "Todo deleted successfully"
}
```

**見つからない (404 Not Found)**:
```json
{
  "error": "Todo not found"
}
```

---

## 6. 統計情報取得

### リクエスト

```
GET /api/stats
```

### レスポンス

**成功 (200 OK)**:
```json
{
  "total": 6,
  "completed": 2,
  "pending": 4,
  "overdue": 1,
  "completionRate": 33,
  "priorityBreakdown": {
    "high": 2,
    "medium": 3,
    "low": 1
  },
  "productivityScore": 45
}
```

**フィールド説明**:

| フィールド | 型 | 説明 |
|-----------|-----|------|
| total | number | 総タスク数 |
| completed | number | 完了済みタスク数 |
| pending | number | 未完了タスク数 |
| overdue | number | 期限超過タスク数 |
| completionRate | number | 完了率（0-100） |
| priorityBreakdown | object | 優先度別タスク数 |
| productivityScore | number | 生産性スコア（0-100） |

---

## エラーレスポンス形式

すべてのエラーは以下の形式で返されます：

```json
{
  "error": "エラーメッセージ",
  "details": ["詳細1", "詳細2"]  // オプション
}
```

**HTTPステータスコード**:

| コード | 説明 |
|--------|------|
| 200 | 成功 |
| 201 | 作成成功 |
| 400 | 不正なリクエスト（バリデーションエラー等） |
| 404 | リソースが見つからない |
| 500 | サーバーエラー |

---

## データ型定義

### Todo

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### ValidationResult

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
```

---

## バリデーションルール

### title
- 必須
- 2文字以上100文字以下
- 前後の空白はトリム

### description
- 任意
- 500文字以下

### priority
- 任意（デフォルト: medium）
- high / medium / low のいずれか

### dueDate
- 任意
- 有効な日付形式（YYYY-MM-DD）

---

## 使用例（curl）

### TODO一覧取得
```bash
curl http://localhost:3000/api/todos
```

### フィルター付き一覧取得
```bash
curl "http://localhost:3000/api/todos?priority=high&completed=false"
```

### TODO作成
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "新しいタスク", "priority": "high"}'
```

### TODO更新
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### TODO削除
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

### 統計情報取得
```bash
curl http://localhost:3000/api/stats
```
