import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRecipeBySlug, getAllSlugs } from '@/lib/recipes';
import PhaseTag from '@/components/PhaseTag';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return { title: '找不到食譜' };
  return {
    title: `${recipe.title} — CDED 食譜`,
    description: recipe.description,
  };
}

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/recipes" className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block">
        &larr; 返回食譜列表
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.phase.map((p) => (
            <PhaseTag key={p} phase={p} />
          ))}
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {recipe.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-gray-500">{recipe.description}</p>

        <div className="flex gap-6 mt-4 text-sm text-gray-500">
          <div>
            <span className="font-medium text-gray-700">準備時間</span>
            <br />
            {recipe.prepTime} 分鐘
          </div>
          <div>
            <span className="font-medium text-gray-700">烹飪時間</span>
            <br />
            {recipe.cookTime} 分鐘
          </div>
          <div>
            <span className="font-medium text-gray-700">份量</span>
            <br />
            {recipe.servings} 人份
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">食材</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-700">{ing.name}</span>
              <span className="text-gray-500">
                {ing.amount} {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">烹飪步驟</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-gray-700 pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tips */}
      {recipe.tips && (
        <section className="bg-warm-50 border border-warm-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-2">小提醒</h2>
          <p className="text-gray-600">{recipe.tips}</p>
        </section>
      )}

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
