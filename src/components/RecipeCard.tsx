import Link from 'next/link';
import { Recipe } from '@/types';
import PhaseTag from './PhaseTag';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 h-full flex flex-col">
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.phase.map((p) => (
            <PhaseTag key={p} phase={p} />
          ))}
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {recipe.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-grow">{recipe.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>準備 {recipe.prepTime} 分</span>
          <span>烹飪 {recipe.cookTime} 分</span>
          <span>{recipe.servings} 人份</span>
        </div>
      </div>
    </Link>
  );
}
