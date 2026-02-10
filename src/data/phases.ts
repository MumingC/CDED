import { PhaseInfo } from '@/types';

export const phases: PhaseInfo[] = [
  {
    phase: 1,
    title: '第一階段 — 排除期',
    duration: '第 1–6 週',
    description:
      '最嚴格的飲食階段，目標是透過排除可能引發腸道發炎的食物來誘導疾病緩解。此階段需搭配部分腸內營養配方（如 Modulen IBD）提供約 50% 的每日熱量。',
    allowed: [
      '雞胸肉、魚肉（新鮮）',
      '白米飯、馬鈴薯',
      '雞蛋',
      '香蕉、蘋果（去皮）',
      '胡蘿蔔、南瓜、地瓜',
      '橄欖油（少量）',
      '鹽、薑、薑黃',
    ],
    avoided: [
      '乳製品（牛奶、起司、優格）',
      '麩質食品（麵包、麵條、餅乾）',
      '加工食品與包裝食品',
      '紅肉與加工肉類',
      '辛辣食物',
      '酒精與含糖飲料',
      '堅果與種子',
      '豆類',
      '高纖蔬菜（花椰菜、高麗菜）',
    ],
    color: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    phase: 2,
    title: '第二階段 — 漸進期',
    duration: '第 7–12 週',
    description:
      '逐步重新引入部分食物，擴大飲食範圍。腸內營養配方的比例降低至約 25%。患者需密切觀察身體反應，如出現症狀應暫停新增食物。',
    allowed: [
      '第一階段所有允許食物',
      '全麥麵包（少量）',
      '瘦牛肉（少量）',
      '番茄',
      '草莓、藍莓',
      '低脂優格',
      '杏仁（少量）',
      '燕麥',
    ],
    avoided: [
      '高脂乳製品',
      '加工食品與包裝食品',
      '油炸食物',
      '辛辣調味料',
      '酒精',
      '含糖飲料與甜點',
      '人工添加物',
    ],
    color: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    phase: 3,
    title: '第三階段 — 維持期',
    duration: '第 13 週起（長期）',
    description:
      '維持健康飲食習慣的長期階段。大部分天然食物可以食用，但仍需避免加工食品與已知的個人觸發食物。不再需要腸內營養配方，但建議維持均衡營養。',
    allowed: [
      '第二階段所有允許食物',
      '大部分天然未加工食物',
      '全穀類',
      '各類水果與蔬菜',
      '豆類（適量）',
      '堅果與種子（適量）',
      '低脂乳製品',
    ],
    avoided: [
      '加工食品與超加工食品',
      '含人工添加物的食品',
      '過量酒精',
      '個人已知的觸發食物',
      '油炸食物（減少頻率）',
    ],
    color: 'bg-green-100 text-green-800 border-green-300',
  },
];

export function getPhaseInfo(phase: number): PhaseInfo | undefined {
  return phases.find((p) => p.phase === phase);
}
