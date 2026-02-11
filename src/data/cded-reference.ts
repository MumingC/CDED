import { PhaseNumber } from '@/types';

export interface FoodCategory {
  category: string;
  items: FoodItem[];
}

export interface FoodItem {
  name: string;
  note?: string;
}

export interface PhaseReference {
  phase: PhaseNumber;
  title: string;
  pen: string; // Partial Enteral Nutrition requirement
  keyPrinciple: string;
  sources: string[];
  mandatory: FoodItem[];
  allowed: FoodCategory[];
  weeklyAllowed: FoodCategory[];
  disallowed: FoodCategory[];
}

export const cdedReference: PhaseReference[] = [
  {
    phase: 1,
    title: '第一階段 — 排除期（第 1-6 週）',
    pen: '50% 每日熱量來自腸內營養配方（如 Modulen IBD）',
    keyPrinciple: '不在允許清單上的食物，一律視為禁止。不可替代。',
    sources: [
      'Levine et al., Gastroenterology 2019, Supplementary Table 3',
      'Modulife Phase 1 Guide (Nestle Health Science)',
    ],
    mandatory: [
      { name: '新鮮雞胸肉', note: '每日 150-200g（Modulife: 5-7 oz），僅限胸肉' },
      { name: '雞蛋', note: '每日 2 顆' },
      { name: '香蕉', note: '每日 2 根' },
      { name: '新鮮蘋果', note: '每日 1 顆（Modulife: 去皮）' },
      { name: '馬鈴薯', note: '每日 2 顆，去皮煮熟後放涼再吃，不可同餐吃兩顆' },
    ],
    allowed: [
      {
        category: '水果',
        items: [
          { name: '新鮮草莓', note: '論文未標數量；Modulife: 5 顆' },
          { name: '哈密瓜或蜜瓜', note: '每日 1 片' },
          { name: '酪梨', note: '每日 2 半（= 1 顆）' },
          { name: '檸檬、萊姆' },
        ],
      },
      {
        category: '蔬菜',
        items: [
          { name: '番茄', note: '每日 2 顆或 6 顆小番茄（烹飪用可多加）' },
          { name: '小黃瓜', note: '每日 2 根（中型），去皮' },
          { name: '胡蘿蔔', note: '每日 1 根' },
          { name: '菠菜', note: '每日 1 杯生葉' },
          { name: '萵苣', note: '每日 3 片' },
          { name: '洋蔥', note: '調味用' },
        ],
      },
      {
        category: '穀物澱粉',
        items: [
          { name: '白米飯、米粉', note: '無限量' },
          { name: '米製粉（Rice flour）', note: '烘焙用' },
        ],
      },
      {
        category: '油脂',
        items: [
          { name: '橄欖油' },
          { name: '芥花油' },
        ],
      },
      {
        category: '調味料與香草',
        items: [
          { name: '鹽、胡椒、紅椒粉、肉桂、孜然、薑黃', note: '須為純香料' },
          { name: '新鮮香草', note: '羅勒、香菜、迷迭香、百里香、薄荷、蒔蘿' },
          { name: '新鮮薑、蒜' },
        ],
      },
      {
        category: '甜味劑',
        items: [
          { name: '蜂蜜', note: '每日 3 大匙內' },
          { name: '糖', note: '論文: 每日 4 小匙；Modulife: 每日 3 小匙' },
        ],
      },
      {
        category: '飲品',
        items: [
          { name: '水、氣泡水' },
          { name: '花草茶', note: '如洋甘菊茶' },
          { name: '鮮榨柳橙汁', note: '每日 1 杯，必須鮮榨（不可用瓶裝或盒裝）' },
        ],
      },
    ],
    weeklyAllowed: [
      {
        category: '每週一次',
        items: [
          { name: '新鮮瘦白魚肉', note: '不可油炸，需營養師指導（Modulife: 最多 5 oz）' },
        ],
      },
    ],
    disallowed: [
      {
        category: '蛋白質',
        items: [
          { name: '雞胸肉以外的雞肉部位' },
          { name: '其他動物蛋白或大豆蛋白' },
        ],
      },
      {
        category: '乳製品與脂肪',
        items: [
          { name: '乳製品（全部）' },
          { name: '動物性脂肪' },
        ],
      },
      {
        category: '穀物',
        items: [
          { name: '小麥製品' },
        ],
      },
      {
        category: '食品添加物',
        items: [
          { name: '乳化劑' },
          { name: '人工甜味劑' },
          { name: '卡拉膠' },
          { name: '麥芽糊精（及蔗糖素）' },
          { name: '含亞硫酸鹽食品' },
          { name: '三仙膠（Xanthan gum）' },
        ],
      },
      {
        category: '加工食品',
        items: [
          { name: '包裝、罐頭、冷凍預煮食品、麵團、烘焙品' },
          { name: '冷凍或罐頭蔬果' },
          { name: '大豆或無麩質替代品' },
          { name: '現成醬料、糖漿、抹醬、沙拉醬、人造奶油、奶油' },
          { name: '醋、醬油、番茄醬、美乃滋' },
        ],
      },
      {
        category: '飲品與其他',
        items: [
          { name: '酒精、汽水、市售果汁' },
          { name: '咖啡' },
          { name: '油炸食物' },
          { name: '口服鐵劑' },
        ],
      },
    ],
  },
  {
    phase: 2,
    title: '第二階段 — 漸進期（第 7-12 週）',
    pen: '25% 每日熱量來自腸內營養配方',
    keyPrinciple: '蔬果不可一次大量食用，需分散於各餐（早餐、午餐、晚餐、點心），以防有狹窄時造成阻塞。',
    sources: [
      'Levine et al., Gastroenterology 2019, Supplementary Table 3',
    ],
    mandatory: [
      { name: '新鮮雞胸肉', note: '每日 150-200g' },
      { name: '雞蛋', note: '每日 2 顆' },
      { name: '香蕉', note: '每日 2 根' },
      { name: '新鮮蘋果', note: '每日 1 顆' },
      { name: '馬鈴薯', note: '每日 2 顆（或 ½ 地瓜 + 1 馬鈴薯），煮熟放涼' },
    ],
    allowed: [
      {
        category: '第一階段所有允許食物，加上：',
        items: [],
      },
      {
        category: '每日新增',
        items: [
          { name: '全穀麵包', note: '每日 1 片' },
          { name: '藜麥' },
          { name: '煮熟扁豆或豌豆', note: '每日 3 大匙' },
          { name: '杏仁或核桃', note: '6 顆（未加工）' },
          { name: '蘇打粉', note: '用於烘焙' },
        ],
      },
      {
        category: '第 7 週起新增蔬菜',
        items: [
          { name: '花椰菜、白花菜', note: '每日 2 朵' },
          { name: '新鮮蘑菇', note: '每日 4 朵（不可用罐頭）' },
          { name: '紅甜椒', note: '½ 顆' },
          { name: '櫛瓜或南瓜片', note: '1 根' },
        ],
      },
      {
        category: '第 7 週起新增水果',
        items: [
          { name: '梨子 或 奇異果 或 熟油桃', note: '擇一' },
        ],
      },
      {
        category: '第 10 週起新增',
        items: [
          { name: '大部分蔬菜', note: '限量，需營養師指導' },
          { name: '大部分水果', note: '限量，需營養師指導' },
          { name: '藜麥' },
          { name: '煮熟扁豆或豌豆', note: '增至每日 3-4 大匙' },
        ],
      },
    ],
    weeklyAllowed: [
      {
        category: '每週一次',
        items: [
          { name: '新鮮瘦白魚肉', note: '不可油炸，需營養師指導' },
          { name: '沙朗或菲力牛排', note: '最多 200g' },
          { name: '全穀麵包（額外）', note: '最多 1 片' },
          { name: '鮪魚罐頭', note: '橄欖油或芥花油漬，瀝乾' },
          { name: '燕麥', note: '½ 杯' },
        ],
      },
    ],
    disallowed: [
      {
        category: '仍然禁止（除上方允許項目外）',
        items: [
          { name: '乳製品（全部）' },
          { name: '動物性脂肪' },
          { name: '小麥製品' },
          { name: '乳化劑' },
          { name: '人工甜味劑' },
          { name: '雞胸肉以外的雞肉部位' },
          { name: '其他動物蛋白或大豆蛋白' },
          { name: '卡拉膠、麥芽糊精、三仙膠' },
          { name: '含亞硫酸鹽食品' },
          { name: '包裝、罐頭、冷凍預煮食品' },
          { name: '大豆或無麩質替代品' },
          { name: '現成醬料、醋、醬油、番茄醬、美乃滋' },
          { name: '酒精、汽水、市售果汁' },
          { name: '咖啡' },
          { name: '口服鐵劑' },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: '第三階段 — 維持期（第 13 週起）',
    pen: '25% 或更低（個人化調整），或不需要',
    keyPrinciple: '注意：第三階段細節不在原始 Supplementary Table 3 中，以下資料來自其他公開臨床指引。',
    sources: [
      'Children\'s Wisconsin CDED Maintenance Phase Teaching Sheet',
      'PMC Comprehensive Review (2024)',
    ],
    mandatory: [],
    allowed: [
      {
        category: '第二階段所有允許食物，加上：',
        items: [],
      },
      {
        category: '蛋白質',
        items: [
          { name: '雞肉各部位', note: '避免雞皮、雞翅、內臟' },
          { name: '新鮮海鮮 / 鮭魚', note: '每週 140g，新鮮非冷凍' },
          { name: '紅肉（新鮮瘦牛排）', note: '建議 0；如需要，每週最多 200g' },
        ],
      },
      {
        category: '乳製品（有限重新引入）',
        items: [
          { name: '原味全脂優格', note: '每日 1 份（約 170g），無添加物' },
        ],
      },
      {
        category: '穀物',
        items: [
          { name: '全穀麵包', note: '每日 2 片' },
          { name: '煮熟義大利麵', note: '每週 2 次，每次 1 杯，可替代麵包' },
        ],
      },
      {
        category: '水果蔬菜',
        items: [
          { name: '大部分天然未加工水果與蔬菜' },
        ],
      },
      {
        category: '飲品',
        items: [
          { name: '咖啡', note: '每日 1 杯' },
          { name: '茶', note: '每日 1 杯' },
        ],
      },
      {
        category: '自由日規則（每週 2 天）',
        items: [
          { name: '在家自由餐', note: '每天最多 2 餐' },
          { name: '外食', note: '每天最多 1 餐' },
          { name: '每週自由餐上限 4 餐' },
        ],
      },
    ],
    weeklyAllowed: [],
    disallowed: [
      {
        category: '永遠禁止（即使自由日也不可）',
        items: [
          { name: '加工肉類（熱狗、香腸、培根等）' },
          { name: '冷凍麵團與冷凍烘焙食品' },
          { name: '即食食品與微波食品' },
          { name: '汽水與碳酸飲料' },
        ],
      },
      {
        category: '非自由日仍需避免',
        items: [
          { name: '乳化劑、卡拉膠、亞硫酸鹽' },
          { name: '人工甜味劑' },
          { name: '大部分包裝加工食品' },
          { name: '動物性脂肪 / 乳脂（允許的優格除外）' },
          { name: '個人已知的觸發食物' },
        ],
      },
    ],
  },
];
