'use client';

import { PhaseNumber, Category } from '@/types';
import { categories } from '@/data/categories';

interface RecipeFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedPhase: PhaseNumber | null;
  onPhaseChange: (p: PhaseNumber | null) => void;
  selectedCategory: Category | null;
  onCategoryChange: (c: Category | null) => void;
}

export default function RecipeFilter({
  query,
  onQueryChange,
  selectedPhase,
  onPhaseChange,
  selectedCategory,
  onCategoryChange,
}: RecipeFilterProps) {
  const phaseOptions: { value: PhaseNumber; label: string; color: string }[] = [
    { value: 1, label: 'Phase 1', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { value: 2, label: 'Phase 2', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 3, label: 'Phase 3', color: 'bg-green-100 text-green-700 border-green-300' },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="搜尋食譜名稱或標籤..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
      />

      <div className="flex flex-wrap gap-2">
        {/* Phase filter */}
        {phaseOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              onPhaseChange(selectedPhase === opt.value ? null : opt.value)
            }
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedPhase === opt.value
                ? opt.color + ' border-current'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {opt.label}
          </button>
        ))}

        <span className="text-gray-300 self-center">|</span>

        {/* Category filter */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              onCategoryChange(selectedCategory === cat ? null : cat)
            }
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedCategory === cat
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
