'use client';

import { useState } from 'react';
import { PhaseNumber, Category } from '@/types';
import { filterRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/RecipeCard';
import RecipeFilter from '@/components/RecipeFilter';

export default function RecipesPage() {
  const [query, setQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<PhaseNumber | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const results = filterRecipes({
    query: query || undefined,
    phase: selectedPhase || undefined,
    category: selectedCategory || undefined,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">食譜列表</h1>

      <RecipeFilter
        query={query}
        onQueryChange={setQuery}
        selectedPhase={selectedPhase}
        onPhaseChange={setSelectedPhase}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="mt-8">
        {results.length === 0 ? (
          <p className="text-center text-gray-400 py-12">
            沒有找到符合條件的食譜，試試其他篩選條件吧。
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
