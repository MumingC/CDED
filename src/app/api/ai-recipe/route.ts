import { NextRequest, NextResponse } from 'next/server';
import { AIRecipeRequest, AIRecipeResponse, AIGeneratedRecipe, PhaseNumber } from '@/types';
import { phases } from '@/data/phases';

// Mock recipe templates based on common ingredients
const mockRecipeTemplates: Record<string, Partial<AIGeneratedRecipe>> = {
  魚: {
    title: '香煎鱸魚佐薑醬',
    description: '以新鮮鱸魚香煎至金黃，搭配溫和的薑醬汁，清淡又美味。',
    category: '主食',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    steps: [
      '魚肉洗淨擦乾，兩面撒上少許鹽。',
      '平底鍋放少量橄欖油，中火加熱。',
      '魚肉下鍋，每面煎約4-5分鐘至金黃。',
      '另取小鍋，薑末加少許水煮成薑醬。',
      '魚肉裝盤，淋上薑醬即完成。',
    ],
    tips: '煎魚時不要頻繁翻動，讓表面充分煎至金黃再翻面。',
    tags: ['高蛋白', '低脂', '清淡'],
  },
  雞: {
    title: '薑黃雞肉燉飯',
    description: '用薑黃調味的雞肉燉飯，香氣四溢，營養均衡。',
    category: '主食',
    prepTime: 15,
    cookTime: 35,
    servings: 3,
    steps: [
      '雞胸肉切丁，以少許鹽和薑黃粉醃10分鐘。',
      '白米洗淨瀝乾備用。',
      '鍋中放橄欖油，炒香雞丁至變色。',
      '加入白米翻炒均勻，倒入適量水。',
      '大火煮滾後轉小火，蓋鍋燜煮20分鐘至米飯熟透。',
    ],
    tips: '薑黃有抗發炎的效果，適量使用對 CDED 患者有益。',
    tags: ['高蛋白', '抗發炎', '主食'],
  },
  蛋: {
    title: '蔬菜蒸蛋',
    description: '加入當季蔬菜的蒸蛋，滑嫩可口，營養豐富。',
    category: '配菜',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    steps: [
      '雞蛋打散，加入1.5倍溫水和少許鹽攪勻。',
      '蔬菜切成細丁。',
      '蛋液過濾後倒入碗中，放入蔬菜丁。',
      '蓋上保鮮膜，放入蒸鍋中小火蒸12分鐘。',
      '蒸好後淋上少許橄欖油即可享用。',
    ],
    tips: '蛋液過濾是口感滑嫩的關鍵步驟，不要省略。',
    tags: ['高蛋白', '易消化', '清淡'],
  },
  南瓜: {
    title: '南瓜雞肉粥',
    description: '綿密的南瓜搭配雞肉熬成的暖粥，好消化又暖胃。',
    category: '主食',
    prepTime: 10,
    cookTime: 40,
    servings: 3,
    steps: [
      '南瓜去皮切小塊，雞胸肉切丁。',
      '白米洗淨，加入大量水煮滾。',
      '放入南瓜塊，小火慢熬。',
      '南瓜軟爛後加入雞肉丁煮熟。',
      '加鹽調味，撒上少許薑末即完成。',
    ],
    tips: '南瓜煮久會自然化開，讓粥的口感更綿密。',
    tags: ['暖胃', '易消化', '高纖維'],
  },
  地瓜: {
    title: '烤地瓜佐橄欖油',
    description: '簡單的烤地瓜，帶出天然甜味，是健康的點心選擇。',
    category: '點心',
    prepTime: 5,
    cookTime: 45,
    servings: 2,
    steps: [
      '地瓜洗淨，不去皮，用叉子在表面戳幾個洞。',
      '烤箱預熱200°C。',
      '地瓜放入烤箱烤40-45分鐘至軟透。',
      '取出稍微放涼，對半切開。',
      '淋上少許橄欖油和一點鹽即可享用。',
    ],
    tips: '選擇大小均勻的地瓜，烤出來的熟度會比較一致。',
    tags: ['素食', '高纖維', '天然甜'],
  },
};

function generateMockRecipe(
  ingredients: string[],
  phase: PhaseNumber,
  preferences?: string
): AIGeneratedRecipe {
  const phaseInfo = phases.find((p) => p.phase === phase);

  // Find the best matching template
  let matchedTemplate: Partial<AIGeneratedRecipe> | null = null;
  let matchedIngredient = '';

  for (const ingredient of ingredients) {
    for (const [key, template] of Object.entries(mockRecipeTemplates)) {
      if (ingredient.includes(key) || key.includes(ingredient)) {
        matchedTemplate = template;
        matchedIngredient = ingredient;
        break;
      }
    }
    if (matchedTemplate) break;
  }

  // Fallback: create a generic recipe from the ingredients
  if (!matchedTemplate) {
    matchedTemplate = {
      title: `${ingredients.slice(0, 2).join('與')}料理`,
      description: `使用${ingredients.join('、')}製作的健康料理，符合 CDED 第${phase}階段飲食規範。`,
      category: '主食',
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      steps: [
        `將${ingredients[0]}洗淨處理，切成適當大小。`,
        ingredients.length > 1
          ? `${ingredients.slice(1).join('、')}分別處理備用。`
          : '準備調味料：少許鹽和橄欖油。',
        '鍋中放少許橄欖油，中火加熱。',
        `放入所有食材翻炒或燉煮至熟透。`,
        '加鹽調味，裝盤即可享用。',
      ],
      tips: `此食譜依照 CDED 第${phase}階段的飲食原則設計。`,
      tags: ['清淡', '健康'],
    };
  }

  // Build the ingredient list
  const recipeIngredients = ingredients.map((name) => ({
    name,
    amount: '適量',
    unit: '',
  }));

  // Add basic seasonings
  recipeIngredients.push(
    { name: '鹽', amount: '適量', unit: '' },
    { name: '橄欖油', amount: '1', unit: '大匙' }
  );

  // Determine which phases this recipe is suitable for
  const suitablePhases: PhaseNumber[] = [phase];
  if (phase === 1) suitablePhases.push(2, 3);
  else if (phase === 2) suitablePhases.push(3);

  return {
    title: matchedTemplate.title || `${ingredients[0]}料理`,
    description:
      matchedTemplate.description ||
      `使用${ingredients.join('、')}的健康料理。`,
    phase: suitablePhases,
    category: matchedTemplate.category || '主食',
    prepTime: matchedTemplate.prepTime || 15,
    cookTime: matchedTemplate.cookTime || 25,
    servings: matchedTemplate.servings || 2,
    ingredients: recipeIngredients,
    steps: matchedTemplate.steps || [],
    tips:
      matchedTemplate.tips ||
      `請確認所有食材皆符合 CDED 第${phase}階段的飲食規範。`,
    tags: matchedTemplate.tags || ['健康'],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AIRecipeRequest = await request.json();
    const { ingredients, phase, provider, preferences } = body;

    // Validate inputs
    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: '請至少輸入一種食材' },
        { status: 400 }
      );
    }

    if (!phase || ![1, 2, 3].includes(phase)) {
      return NextResponse.json(
        { error: '請選擇有效的 CDED 階段（1-3）' },
        { status: 400 }
      );
    }

    // Check ingredients against phase restrictions
    const phaseInfo = phases.find((p) => p.phase === phase);
    if (phaseInfo) {
      const warnings: string[] = [];
      for (const ingredient of ingredients) {
        for (const avoided of phaseInfo.avoided) {
          if (avoided.includes(ingredient) || ingredient.includes(avoided.split('（')[0])) {
            warnings.push(`「${ingredient}」可能不適合第${phase}階段`);
          }
        }
      }
      if (warnings.length > 0) {
        return NextResponse.json(
          { error: warnings.join('；') + '。請重新選擇食材或調整階段。' },
          { status: 400 }
        );
      }
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock recipe
    const recipe = generateMockRecipe(ingredients, phase, preferences);

    const response: AIRecipeResponse = {
      recipe,
      provider,
      disclaimer:
        '此食譜由 AI 生成，僅供參考。請務必諮詢您的醫療團隊，確認食材是否適合您目前的 CDED 階段與個人狀況。',
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: '生成食譜時發生錯誤，請稍後再試。' },
      { status: 500 }
    );
  }
}
