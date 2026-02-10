'use client';

import { useState } from 'react';
import { PhaseNumber, AIProvider, AIRecipeResponse } from '@/types';
import { phases } from '@/data/phases';

const commonIngredients = [
  '雞胸肉', '魚', '雞蛋', '白米', '南瓜',
  '地瓜', '馬鈴薯', '胡蘿蔔', '蘋果', '香蕉',
  '薑', '橄欖油',
];

const providerOptions: { value: AIProvider; label: string; description: string }[] = [
  { value: 'claude', label: 'Claude', description: 'Anthropic Claude — 擅長細緻的食譜描述' },
  { value: 'gemini', label: 'Gemini', description: 'Google Gemini — 擅長多樣化建議' },
];

export default function AIAssistantPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<PhaseNumber>(1);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('claude');
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIRecipeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addCustomIngredient = () => {
    const trimmed = customIngredient.trim();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
      setCustomIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const handleSubmit = async () => {
    if (selectedIngredients.length === 0) {
      setError('請至少選擇或輸入一種食材');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/ai-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          phase: selectedPhase,
          provider: selectedProvider,
          preferences: preferences || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '生成食譜時發生錯誤');
        return;
      }

      setResult(data);
    } catch {
      setError('網路連線失敗，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setCustomIngredient('');
    setPreferences('');
    setResult(null);
    setError(null);
  };

  const phaseOptions = phases.map((p) => ({
    value: p.phase,
    label: `第${p.phase}階段`,
    subtitle: p.title.split('—')[1]?.trim() || '',
    color:
      p.phase === 1
        ? 'border-orange-400 bg-orange-50 text-orange-800'
        : p.phase === 2
          ? 'border-blue-400 bg-blue-50 text-blue-800'
          : 'border-green-400 bg-green-50 text-green-800',
    selectedColor:
      p.phase === 1
        ? 'border-orange-500 bg-orange-100 text-orange-900 ring-2 ring-orange-300'
        : p.phase === 2
          ? 'border-blue-500 bg-blue-100 text-blue-900 ring-2 ring-blue-300'
          : 'border-green-500 bg-green-100 text-green-900 ring-2 ring-green-300',
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          AI 食譜小幫手
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          輸入你手邊的食材，AI 會根據你目前的 CDED 階段，推薦一道合適的食譜。
          目前支援 Claude 與 Gemini 兩種 AI 模型。
        </p>
        <div className="mt-3 inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700">
          目前為 Mock 模式 — 尚未串接真實 AI API
        </div>
      </div>

      {/* Step 1: Phase Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          1. 選擇你的 CDED 階段
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {phaseOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedPhase(opt.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedPhase === opt.value ? opt.selectedColor : opt.color
              }`}
            >
              <div className="font-bold">{opt.label}</div>
              <div className="text-sm opacity-75">{opt.subtitle}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Ingredient Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          2. 選擇或輸入食材
        </h2>

        {/* Common ingredients grid */}
        <div className="flex flex-wrap gap-2 mb-4">
          {commonIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedIngredients.includes(ingredient)
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>

        {/* Custom ingredient input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomIngredient();
              }
            }}
            placeholder="輸入其他食材..."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-sm"
          />
          <button
            onClick={addCustomIngredient}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            新增
          </button>
        </div>

        {/* Selected ingredients display */}
        {selectedIngredients.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
            <div className="text-xs text-gray-400 mb-2">已選擇的食材：</div>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 text-primary-400 hover:text-primary-700"
                    aria-label={`移除${ingredient}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Step 3: AI Provider */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          3. 選擇 AI 模型
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {providerOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedProvider(opt.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedProvider === opt.value
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-gray-800">{opt.label}</div>
              <div className="text-sm text-gray-500">{opt.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Step 4: Preferences (optional) */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          4. 其他偏好
          <span className="text-sm font-normal text-gray-400 ml-2">（選填）</span>
        </h2>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="例如：希望清淡一點、不要太複雜、適合新手..."
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-sm resize-none"
        />
      </section>

      {/* Submit */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={handleSubmit}
          disabled={isLoading || selectedIngredients.length === 0}
          className="flex-grow px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              AI 正在構思食譜...
            </span>
          ) : (
            '生成食譜'
          )}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          重設
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Recipe Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              {result.recipe.phase.map((p) => (
                <span
                  key={p}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    p === 1
                      ? 'bg-orange-100 text-orange-700'
                      : p === 2
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  Phase {p}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {result.recipe.category}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                由 {result.provider === 'claude' ? 'Claude' : 'Gemini'} 生成
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {result.recipe.title}
            </h2>
            <p className="text-gray-500 mt-1">{result.recipe.description}</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-400">
              <span>準備 {result.recipe.prepTime} 分</span>
              <span>烹飪 {result.recipe.cookTime} 分</span>
              <span>{result.recipe.servings} 人份</span>
            </div>
          </div>

          {/* Ingredients */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-3">食材</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {result.recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                  {ing.name}
                  {ing.amount && (
                    <span className="text-gray-400">
                      {ing.amount} {ing.unit}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-3">作法</h3>
            <ol className="space-y-3">
              {result.recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {result.recipe.tips && (
            <div className="p-6 border-b border-gray-100 bg-amber-50/50">
              <h3 className="font-semibold text-gray-700 mb-1">小提示</h3>
              <p className="text-sm text-gray-600">{result.recipe.tips}</p>
            </div>
          )}

          {/* Tags */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {result.recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-gray-50 text-xs text-gray-400 text-center">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}
