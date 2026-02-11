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
  mandatory: FoodItem[];
  allowed: FoodCategory[];
  disallowed: FoodCategory[];
}

export const cdedReference: PhaseReference[] = [
  {
    phase: 1,
    title: '第一階段 — 排除期（第 1-6 週）',
    pen: '50% 每日熱量來自腸內營養配方（如 Modulen IBD）',
    mandatory: [
      { name: '雞胸肉', note: '每日至少 150-200g，去皮新鮮' },
      { name: '雞蛋', note: '每日 2 顆' },
      { name: '香蕉', note: '每日 2 根' },
      { name: '蘋果', note: '每日 1 顆，去皮煮熟' },
      { name: '馬鈴薯', note: '每日 2 顆，煮熟放涼再吃（抗性澱粉）' },
      { name: '新鮮瘦魚肉', note: '每週 1 次，約 140g' },
    ],
    allowed: [
      {
        category: '水果',
        items: [
          { name: '酪梨', note: '每日 1 顆（每餐半顆）' },
          { name: '草莓', note: '每日 5 顆' },
          { name: '哈密瓜', note: '每日 1 片' },
          { name: '檸檬汁', note: '調味用，不限量' },
          { name: '鮮榨柳橙汁', note: '每日 1 杯' },
        ],
      },
      {
        category: '蔬菜',
        items: [
          { name: '番茄', note: '每日 2 顆（或 6 顆小番茄）' },
          { name: '小黃瓜', note: '每日 2 根，去皮' },
          { name: '胡蘿蔔', note: '每日 1 根' },
          { name: '菠菜', note: '每日 1 杯（生）' },
          { name: '萵苣', note: '每日 3 片' },
          { name: '洋蔥', note: '調味用' },
          { name: '蒜', note: '調味用' },
        ],
      },
      {
        category: '穀物澱粉',
        items: [
          { name: '白米飯', note: '不限量' },
          { name: '米粉 / 米線', note: '不限量，無添加物' },
          { name: '米製麵包', note: '100% 米製' },
          { name: '米粉（烘焙用）' },
        ],
      },
      {
        category: '油脂',
        items: [
          { name: '橄欖油', note: '烹飪與調味' },
          { name: '芥花油', note: '烹飪用' },
        ],
      },
      {
        category: '調味料與香草',
        items: [
          { name: '鹽、胡椒' },
          { name: '薑、薑黃' },
          { name: '肉桂、孜然、紅椒粉' },
          { name: '新鮮香草', note: '薄荷、香菜、羅勒、迷迭香、百里香等' },
        ],
      },
      {
        category: '甜味劑',
        items: [
          { name: '蜂蜜', note: '每日 3 大匙內' },
          { name: '糖', note: '每日 3 小匙內' },
        ],
      },
      {
        category: '飲品',
        items: [
          { name: '水（含氣泡水）', note: '不限量' },
          { name: '花草茶（洋甘菊等）' },
        ],
      },
    ],
    disallowed: [
      {
        category: '蛋白質',
        items: [
          { name: '紅肉（牛、羊、豬）' },
          { name: '加工肉類（熱狗、香腸、培根）' },
          { name: '火雞肉' },
          { name: '冷凍或預包裝魚/海鮮' },
          { name: '豆腐與大豆製品' },
        ],
      },
      {
        category: '乳製品（全部禁止）',
        items: [
          { name: '牛奶（含非乳替代品）' },
          { name: '優格、起司' },
          { name: '奶油、鮮奶油' },
          { name: '冰淇淋' },
        ],
      },
      {
        category: '穀物',
        items: [
          { name: '小麥製品（麵包、麵條、餅乾、麥片）' },
          { name: '燕麥' },
          { name: '玉米及其製品' },
          { name: '酵母及酵母製品' },
          { name: '除米粉以外的所有麵粉' },
        ],
      },
      {
        category: '豆類、堅果、種子',
        items: [
          { name: '所有豆類（扁豆、鷹嘴豆等）' },
          { name: '所有堅果' },
          { name: '所有種子' },
          { name: '芝麻醬' },
        ],
      },
      {
        category: '加工食品',
        items: [
          { name: '罐頭食品' },
          { name: '冷凍食品' },
          { name: '包裝零食' },
          { name: '即食食品' },
          { name: '醬料、沙拉醬' },
        ],
      },
      {
        category: '添加物',
        items: [
          { name: '乳化劑' },
          { name: '卡拉膠' },
          { name: '亞硫酸鹽' },
          { name: '人工甜味劑' },
          { name: '防腐劑' },
          { name: '複方調味粉（常含添加物）' },
        ],
      },
      {
        category: '飲品',
        items: [
          { name: '咖啡' },
          { name: '含咖啡因的茶' },
          { name: '酒精' },
          { name: '汽水、碳酸飲料' },
          { name: '市售果汁（鮮榨柳橙汁除外）' },
        ],
      },
      {
        category: '其他',
        items: [
          { name: '糖果、巧克力、蛋糕' },
          { name: '口香糖' },
          { name: '油炸食物' },
          { name: '外食（不可在餐廳用餐）' },
        ],
      },
    ],
  },
  {
    phase: 2,
    title: '第二階段 — 漸進期（第 7-12 週）',
    pen: '25% 每日熱量來自腸內營養配方',
    mandatory: [
      { name: '雞胸肉', note: '每日至少 150-200g' },
      { name: '雞蛋', note: '每日 2 顆' },
      { name: '香蕉', note: '每日 2 根' },
      { name: '蘋果', note: '每日 1 顆，去皮煮熟' },
      { name: '馬鈴薯', note: '每日 2 顆，煮熟放涼' },
      { name: '新鮮瘦魚肉', note: '每週 1 次' },
    ],
    allowed: [
      {
        category: '第一階段所有允許食物，加上：',
        items: [],
      },
      {
        category: '新增蔬菜（第 7-9 週）',
        items: [
          { name: '地瓜、山藥' },
          { name: '櫛瓜' },
          { name: '蘑菇' },
          { name: '花椰菜、白花菜' },
          { name: '紅甜椒' },
        ],
      },
      {
        category: '新增蔬菜（第 10-12 週）',
        items: [
          { name: '幾乎所有蔬菜', note: '除羽衣甘藍、韭蔥、蘆筍、朝鮮薊' },
        ],
      },
      {
        category: '新增水果（第 7-10 週）',
        items: [
          { name: '梨子、桃子' },
          { name: '奇異果' },
          { name: '藍莓' },
        ],
      },
      {
        category: '新增水果（第 11-12 週）',
        items: [
          { name: '芒果、鳳梨' },
          { name: '柳橙（整顆）' },
        ],
      },
      {
        category: '新增豆類（限量）',
        items: [
          { name: '扁豆', note: '乾燥，1/2 杯' },
          { name: '鷹嘴豆', note: '乾燥，1/2 杯' },
          { name: '豌豆', note: '限量' },
        ],
      },
      {
        category: '新增堅果',
        items: [
          { name: '杏仁', note: '每日 6-8 顆，未加工' },
          { name: '核桃', note: '每日 6-8 顆，未加工' },
        ],
      },
      {
        category: '其他新增',
        items: [
          { name: '純芝麻醬', note: '無防腐劑、乳化劑、亞硫酸鹽' },
          { name: '瘦牛排', note: '每週 1 次，最多 170g' },
          { name: '自製蘇打粉麵包', note: '每日 1 片，無酵母' },
          { name: '油炸食物', note: '每週限 1 次' },
        ],
      },
    ],
    disallowed: [
      {
        category: '仍然禁止',
        items: [
          { name: '所有乳製品（仍全面禁止）' },
          { name: '小麥與麩質製品（酵母麵包仍禁止）' },
          { name: '燕麥、玉米' },
          { name: '種子類' },
          { name: '加工肉類' },
          { name: '罐頭、冷凍與包裝食品' },
          { name: '乳化劑、人工甜味劑等添加物' },
          { name: '咖啡、酒精' },
        ],
      },
      {
        category: '特定蔬菜',
        items: [
          { name: '羽衣甘藍' },
          { name: '韭蔥' },
          { name: '蘆筍' },
          { name: '朝鮮薊' },
        ],
      },
      {
        category: '其他',
        items: [
          { name: '外食（仍不可在餐廳用餐）' },
        ],
      },
    ],
  },
  {
    phase: 3,
    title: '第三階段 — 維持期（第 13 週起）',
    pen: '25% 或更低（個人化調整），或不需要',
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
          { name: '全穀麵包', note: '每日 2 片，自製為佳' },
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
