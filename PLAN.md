# CDED 食譜網站 — 實作規劃

## 專案概述

建立一個以 **克隆氏症排除飲食 (Crohn's Disease Exclusion Diet, CDED)** 為主題的食譜網站，提供患者依照不同治療階段瀏覽適合的食譜與飲食建議。

---

## 技術架構

| 項目 | 選擇 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS |
| 食譜資料 | 本地 JSON/MDX 檔案（無需資料庫） |
| 部署 | 可部署至 Vercel / Netlify |

---

## CDED 階段說明

| 階段 | 期間 | 說明 |
|------|------|------|
| **Phase 1** | 第 1–6 週 | 最嚴格的排除期，目標是誘導緩解。僅允許特定食物。 |
| **Phase 2** | 第 7–12 週 | 逐步重新引入部分食物，擴大飲食範圍。 |
| **Phase 3** | 第 13 週起 | 維持期，允許更多食物種類，保持長期飲食習慣。 |

---

## 網站頁面結構

```
/                        → 首頁（CDED 介紹 + 階段總覽 + 精選食譜）
/recipes                 → 食譜列表頁（支援搜尋、階段篩選、分類篩選）
/recipes/[slug]          → 食譜詳情頁（食材、步驟、營養標示、階段標籤）
/phases                  → CDED 階段說明頁（三個階段的飲食指南）
/phases/[phase]          → 各階段詳細頁面（允許/禁止食物列表 + 該階段食譜）
/about                   → 關於頁面（CDED 背景、免責聲明）
```

---

## 資料模型

### Recipe（食譜）

```typescript
interface Recipe {
  slug: string;              // URL 識別碼
  title: string;             // 食譜名稱
  description: string;       // 簡短描述
  phase: (1 | 2 | 3)[];     // 適用階段（可跨階段）
  category: Category;        // 分類
  prepTime: number;          // 準備時間（分鐘）
  cookTime: number;          // 烹飪時間（分鐘）
  servings: number;          // 份量
  ingredients: Ingredient[]; // 食材列表
  steps: string[];           // 烹飪步驟
  tips?: string;             // 小提醒
  image?: string;            // 圖片路徑
  tags: string[];            // 標籤（如：低脂、高蛋白）
}

type Category = '主食' | '湯品' | '沙拉' | '點心' | '飲品' | '配菜';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}
```

---

## 目錄結構

```
CDED/
├── public/
│   └── images/
│       └── recipes/          # 食譜圖片
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 根 Layout（導覽列、頁尾）
│   │   ├── page.tsx          # 首頁
│   │   ├── recipes/
│   │   │   ├── page.tsx      # 食譜列表頁
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # 食譜詳情頁
│   │   ├── phases/
│   │   │   ├── page.tsx      # 階段總覽頁
│   │   │   └── [phase]/
│   │   │       └── page.tsx  # 各階段詳情頁
│   │   └── about/
│   │       └── page.tsx      # 關於頁面
│   ├── components/
│   │   ├── Navbar.tsx        # 導覽列
│   │   ├── Footer.tsx        # 頁尾
│   │   ├── RecipeCard.tsx    # 食譜卡片元件
│   │   ├── RecipeFilter.tsx  # 篩選/搜尋元件
│   │   ├── PhaseTag.tsx      # 階段標籤元件
│   │   └── IngredientList.tsx # 食材清單元件
│   ├── data/
│   │   ├── recipes.ts        # 食譜資料
│   │   ├── phases.ts         # 階段資訊與食物清單
│   │   └── categories.ts     # 分類資料
│   ├── lib/
│   │   └── recipes.ts        # 食譜查詢/篩選工具函式
│   └── types/
│       └── index.ts          # TypeScript 型別定義
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── PLAN.md
```

---

## 實作步驟

### Step 1：專案初始化
- 使用 `create-next-app` 建立 Next.js 專案（TypeScript + Tailwind CSS + App Router）
- 設定基本 config 與 `.gitignore`

### Step 2：型別定義與資料層
- 建立 `types/index.ts` 定義 Recipe、Phase 等型別
- 建立 `data/phases.ts`：三個階段的說明、允許/禁止食物清單
- 建立 `data/recipes.ts`：預置 6–10 道範例食譜（涵蓋不同階段與分類）
- 建立 `lib/recipes.ts`：食譜查詢、篩選、搜尋的工具函式

### Step 3：共用元件與 Layout
- 建立 `Navbar`：導覽列含首頁、食譜、階段說明、關於等連結
- 建立 `Footer`：頁尾含免責聲明
- 建立根 `layout.tsx`：套用全站佈局與字型
- 建立 `RecipeCard`：食譜卡片（圖片、名稱、階段標籤、時間）
- 建立 `PhaseTag`：階段標籤（Phase 1/2/3 不同顏色）

### Step 4：首頁
- CDED 簡介區塊
- 三階段快速導覽卡片
- 精選食譜展示

### Step 5：食譜列表頁 `/recipes`
- 搜尋框（依名稱搜尋）
- 階段篩選（Phase 1 / 2 / 3）
- 分類篩選（主食、湯品、沙拉等）
- 食譜卡片網格顯示

### Step 6：食譜詳情頁 `/recipes/[slug]`
- 食譜標題、階段標籤、分類
- 食材清單
- 烹飪步驟
- 準備/烹飪時間、份量
- 小提醒

### Step 7：階段說明頁 `/phases`
- 三個階段的總覽卡片
- 各階段詳情頁：飲食指南、允許/禁止食物列表、該階段適用食譜

### Step 8：關於頁面
- CDED 背景說明與參考文獻
- 醫療免責聲明

---

## 設計風格

- **配色**: 溫暖自然的色調（綠色/米色為主色）
- **字型**: 使用 Noto Sans TC（繁體中文友好）
- **風格**: 簡潔、易讀、無障礙設計
- **響應式**: 支援手機、平板、桌面

---

## 範例食譜（預置資料）

1. **清蒸鱸魚** — Phase 1, 2, 3 / 主食
2. **南瓜濃湯** — Phase 1, 2, 3 / 湯品
3. **雞胸肉沙拉** — Phase 2, 3 / 沙拉
4. **地瓜飯** — Phase 1, 2, 3 / 主食
5. **香蕉燕麥鬆餅** — Phase 2, 3 / 點心
6. **薑汁雞湯** — Phase 1, 2, 3 / 湯品
7. **蒸蛋** — Phase 1, 2, 3 / 配菜
8. **蘋果汁** — Phase 1, 2, 3 / 飲品

---

## 注意事項

- 所有頁面需包含醫療免責聲明：「本網站僅供參考，不構成醫療建議。請諮詢您的醫師或營養師。」
- 食譜資料以靜態方式管理，未來可擴展為 CMS（如 Contentlayer / Sanity）
- SEO 優化：使用 Next.js metadata API 設定各頁面 title/description
